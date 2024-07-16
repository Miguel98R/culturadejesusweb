let ms = require('../helpers/apiato.helper')
let salesModel = require('../models/sales.model')
let salesDetailsModel = require('../models/salesDetails.model')
let usersModel = require('../models/users.model')
let usersAddresModel = require('../models/userAddress.model')
let usersShoppingModel = require('../models/userShipping.model')
let productModel = require('../models/products.model')
let confModel = require('../models/configurations.model')

const {sendMail, template} = require('./../helpers/mail.helper')
const mongoose = require("mongoose");
const moment = require('moment')

//APIATO CONFIGURE
let validationObject = {}
let populationObject = false
let options = {}
let aggregate_pipeline_dt = []
let aggregate_pipeline = []


module.exports = {
    createSaleTransfer: async (req, res) => {
        let body = req.body

        console.log("body", body)

        try {

            let data_user = body.storedUser
            let conf_sale = body.storedConfSale
            let cart = body.storedCart
            let statusSale = body.statusSale
            let payment_img = body.img_payment

            let type_payout = conf_sale.type_payout
            let cant_products = conf_sale.no_products
            let total_sale = conf_sale.total_Sale
            let total_envio = conf_sale.total_envio || 0
            let subtotal_sale = conf_sale.subtotal_sale || total_sale

//-----------------------------------------------------------CREATE USER

            let searchUser = await usersModel.findOne({email: data_user.email})
            if (!searchUser) {
                const username = data_user.email.split('@')[0];

                searchUser = await usersModel.create({
                    user_name: username,
                    email: data_user.email,
                    name: data_user.name + ' ' + data_user.lastName,
                    usersTypes: 'user',
                    active: false

                })
            }

            let searchShopping = await usersShoppingModel.findOne({userConf: searchUser._id})
            let searchAddress

            if (!searchShopping) {

                searchAddress = await usersAddresModel.create({
                    noExt: data_user.noExt,
                    noInt: data_user.noInt,
                    address: data_user.address,
                    neighborhood: data_user.neighborhood,
                    zip: data_user.zip,
                    city: data_user.city,
                    state: data_user.state,
                    country: data_user.country,
                    reference: data_user.reference,
                })


                searchShopping = await usersShoppingModel.create({
                    name: data_user.name,
                    lastName: data_user.lastName,
                    gender: data_user.gender,
                    cellphone: data_user.cellphone,
                    userConf: searchUser._id,
                    userAddress: searchAddress._id,
                    count_sale: 1,


                })
            } else {

                searchAddress = await usersAddresModel.findById(searchShopping.userAddress)

                searchAddress.noExt = data_user.noExt
                searchAddress.noInt = data_user.noInt
                searchAddress.address = data_user.address
                searchAddress.neighborhood = data_user.neighborhood
                searchAddress.zip = data_user.zip
                searchAddress.city = data_user.city
                searchAddress.state = data_user.state
                searchAddress.country = data_user.country
                searchAddress.reference = data_user.reference

                await searchAddress.save()


                searchShopping.cellphone = data_user.cellphone

                searchShopping.count_sale = Number(searchShopping.count_sale) + 1

                await searchShopping.save()

            }
//-----------------------------------------------------------CREATE SALE

            let array_products_details = []

            for (let item of cart) {
                let searchProduct = await productModel.findById(item.id_product)

                let stockActual = Number(searchProduct.stock)

                let newStock = stockActual - Number(item.quantity)

                if (newStock <= 0) {
                    searchProduct.active = false
                }


                let newDetalle = await salesDetailsModel.create({

                    product: item.id_product,
                    stockAlMomento: stockActual,
                    cant: Number(item.quantity),
                    priceProduct: Number(item.price),
                    total_detalle: Number(item.price) * Number(item.quantity),
                    talla: item.selectedTalla

                })

                array_products_details.push(newDetalle._id)

                searchProduct.count_sale = searchProduct.count_sale + Number(item.quantity)

                let stock_new = newStock <= 0 ? 0 : newStock
                searchProduct.stock = stock_new


                await searchProduct.save()
            }


            let newSale = await salesModel.create({
                statusSale : 'PRV_sale',
                type_payout,
                user_data: searchShopping._id,
                details_sale: array_products_details,
                payment_img,
                cant_products,
                subtotal_sale,
                total_envio,
                total_sale

            })

            let fullUrl = req.protocol + '://' + req.get('host')
            let URI = fullUrl + '/checkout-payments/' + newSale._id

            res.status(200).json({
                success: true,
                data: URI

            })


            // ------------------------------- ENVIO DE EMAILS PARA USUARIO Y ADMINISTRADOOR

            let fullName = searchShopping.name + ' ' + searchShopping.lastName + ' '
            let image_banner = 'https://www.fuegomexicano.com/public/images/fuego/logo_.png'

            let mail = await template.generic(image_banner, 'Recordatorio de pago', 'Finaliza tu pago', `Hola ${fullName}  es un recordatorio para finalizar tu compra por la cantidad de $ ${total_sale}, dale click al siguiente boton para finalizarla`, URI, 'Click Aqui')
            await sendMail('"Fuego Mexicano - Héctor Andrade" <noreply@fuegomexicano.com>', data_user.email, 'Finaliza tu pago.', mail)


            let emailNotificationConfig = await confModel.findOne({ description: 'email_notification' }).select('value');
            let URI_panel = fullUrl + '/cjPanel'

            let emailNotification = await template.generic(
                image_banner,
                'Nueva compra',
                'Notificación de compra',
                `Hola. Se ha generado una nueva compra realizada por el usuario ${fullName}. Haz clic en el siguiente botón para acceder al panel y gestionar la venta.`,
                URI_panel,
                'Ir al Panel de Ventas'
            );

            await sendMail(
                '"Fuego Mexicano - Héctor Andrade" <noreply@fuegomexicano.com>',
                emailNotificationConfig.value,
                'Notificación de nueva compra',
                emailNotification
            );



        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e
            })
        }
    },
    updatePayementTransfer: async (req, res) => {
        let {id} = req.params;
        let {url_img} = req.body;
        try {


            let searchSale = await salesModel.findById(id)
            searchSale.statusSale = 'OR_sale'
            searchSale.date_payment = moment().format()
            searchSale.payment_img = url_img

            await searchSale.save()

            res.status(200).json({
                success: true,

            });

            let searchShopping = await usersShoppingModel.findById(searchSale.user_data)
            let searchConfUser = await usersModel.findById(searchShopping.userConf)

            let fullUrl = req.protocol + '://' + req.get('host')

            let URI = fullUrl + '/'


            let fullName = searchShopping.name + ' ' + searchShopping.lastName + ' '

            let image_banner = 'https://www.fuegomexicano.com/public/images/fuego/logo_.png'

            let mail = await template.generic(image_banner, 'Notificación de compra', 'Hemos recibido tu comprobante de pago', `Hola ${fullName}, hemos recibido tu comprobante de pago. El equipo de Fuego Mexicano revisará la información para asegurarse de que todo esté en orden. En caso de que haya algún problema, nos pondremos en contacto contigo. Recuerda que realizamos los envios los dias viernes antes de las 12 PM`, URI, 'Ir a la Página')

            await sendMail('"Fuego Mexicano - Héctor Andrade" <noreply@fuegomexicano.com>', searchConfUser.email, 'Notificación de Recepción de Comprobante de Pago.', mail)


        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    getDetailsSale: async (req, res) => {
        let {id} = req.params;

        try {
            let sale = await salesModel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: salesDetailsModel.collection.name,
                        localField: 'details_sale',
                        foreignField: '_id',
                        as: 'salesDetails'
                    }
                },
                {
                    $unwind: '$salesDetails'
                },
                {
                    $lookup: {
                        from: productModel.collection.name,
                        localField: 'salesDetails.product',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $lookup: {
                        from: usersShoppingModel.collection.name,
                        localField: 'user_data',
                        foreignField: '_id',
                        as: 'userShipping'
                    }
                },
                {
                    $unwind: '$userShipping'
                },
                {
                    $lookup: {
                        from: usersModel.collection.name,
                        localField: 'userShipping.userConf',
                        foreignField: '_id',
                        as: 'userConf'
                    }
                },
                {
                    $unwind: '$userConf'
                },
                {
                    $lookup: {
                        from: usersAddresModel.collection.name,
                        localField: 'userShipping.userAddress',
                        foreignField: '_id',
                        as: 'userAddress'
                    }
                },
                {
                    $unwind: '$userAddress'
                },
                {
                    $group: {
                        _id: '$_id',
                        cant_products: {$first: '$cant_products'},
                        date_sale: {$first: '$date_sale'},
                        subtotal_sale: {$first: '$subtotal_sale'},
                        total_envio: {$first: '$total_envio'},
                        total_sale: {$first: '$total_sale'},
                        type_payout: {$first: '$type_payout'},
                        payment_img: {$first: '$payment_img'},
                        email: {$first: '$userConf.email'},
                        name_user: {$first: '$userConf.name'},
                        cellphone: {$first: '$userShipping.cellphone'},
                        userAddress: {$first: '$userAddress'},
                        mercado_pago_status: {$first: '$mercado_pago_status'},
                        details_sale: {
                            $push: {
                                _id: '$salesDetails._id',
                                product: '$product',
                                cant: '$salesDetails.cant',
                                priceProduct: '$salesDetails.priceProduct',
                                total_detalle: '$salesDetails.total_detalle',

                            }
                        }
                    }
                },


            ]);

            res.status(200).json({
                success: true,
                sale: sale[0]
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e
            });
        }
    },
    getOneById: async (req, res) => {
        let {id} = req.params;

        try {
            let sale = await salesModel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: salesDetailsModel.collection.name,
                        localField: 'details_sale',
                        foreignField: '_id',
                        as: 'salesDetails'
                    }
                },
                {
                    $unwind: '$salesDetails'
                },
                {
                    $lookup: {
                        from: productModel.collection.name,
                        localField: 'salesDetails.product',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        cant_products: {$first: '$cant_products'},
                        date_sale: {$first: '$date_sale'},
                        subtotal_sale: {$first: '$subtotal_sale'},
                        total_envio: {$first: '$total_envio'},
                        total_sale: {$first: '$total_sale'},
                        details_sale: {
                            $push: {
                                _id: '$salesDetails._id',
                                product: '$product',
                                cant: '$salesDetails.cant',
                                priceProduct: '$salesDetails.priceProduct',
                                total_detalle: '$salesDetails.total_detalle',
                                talla: '$salesDetails.talla',

                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        cant_products: 1,
                        date_sale: 1,
                        subtotal_sale: 1,
                        total_envio: 1,
                        total_sale: 1,
                        details_sale: 1
                    }
                }
            ]);

            res.status(200).json({
                success: true,
                sale
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e
            });
        }
    },
    datatable_aggregate: async (req, res) => {
        try {
            const {status_sale} = req.body;
            console.log("status_sale------------", status_sale);

            const data = await salesModel.aggregate([
                {
                    $match: {
                        statusSale: status_sale,
                    },
                },
                {
                    $lookup: {
                        from: usersShoppingModel.collection.name,
                        localField: 'user_data',
                        foreignField: '_id',
                        as: 'user_info',
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            _id: '$_id',
                            user_name: {
                                $concat: [
                                    {$arrayElemAt: ['$user_info.name', 0]},
                                    ' ',
                                    {$arrayElemAt: ['$user_info.lastName', 0]},
                                ],
                            },
                            dates_sale: {
                                date_shipment: "$date_shipment",
                                date_payment: "$date_payment",
                            },
                            cant_products: "$cant_products",
                            total_sale: "$total_sale",
                            date_sale: "$date_sale",
                        },
                    },
                },
            ]);

            console.log("data------------", data);

            res.status(200).json({
                success: true,
                data: data,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    updateStatusSendSale: async (req, res) => {
        try {
            const {id} = req.params;

            let searchSale = await salesModel.findById(id)
            searchSale.statusSale = 'OR_send'
            searchSale.date_shipment = moment().format()

            await searchSale.save()

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    upateSaleToHistoricStatus: async (req, res) => {
        try {
            const {id} = req.params;

            let searchSale = await salesModel.findById(id)
            searchSale.statusSale = 'OR_historic'
            searchSale.date_shipment = moment().format()

            await searchSale.save()

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    upateSendToSaleStatus: async (req, res) => {
        try {
            const {id} = req.params;

            let searchSale = await salesModel.findById(id)
            searchSale.statusSale = 'OR_sale'
            searchSale.date_shipment = ''

            await searchSale.save()

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    sendNotification: async (req, res) => {
        try {
            const {id_sale} = req.body;

            let searchSale = await salesModel.findById(id_sale)
            let searchShopping = await usersShoppingModel.findById(searchSale.user_data)
            let userConf = await usersModel.findById(searchShopping.userConf)

            let fullUrl = req.protocol + '://' + req.get('host')

            let URI = fullUrl + '/checkout-payments/' + id_sale


            let fullName = searchShopping.name + ' ' + searchShopping.lastName + ' '

            let image_banner = 'https://www.fuegomexicano.com/public/images/fuego/logo_.png'

            let mail = await template.generic(image_banner, 'Recordatorio de pago', 'Finaliza tu pago', `Hola ${fullName}  es un recordatorio para finalizar tu compra por la cantidad de $ ${searchSale.total_sale}, dale click al siguiente boton para finalizarla`, URI, 'Click Aqui')

            await sendMail('"Fuego Mexicano - Héctor Andrade" <noreply@fuegomexicano.com>', userConf.email, 'Finaliza tu pago.', mail)


            await searchSale.save()

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },
    cancelSale: async (req, res) => {
        try {
            const {id} = req.params;

            let searchSale = await salesModel.findById(id)
            searchSale.statusSale = 'OR_canceled'
            searchSale.date_shipment = moment().format()

            await searchSale.save()

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: e,
            });
        }
    },

    createMany: ms.createMany(salesModel, validationObject, populationObject, options),
    getOneWhere: ms.getOneWhere(salesModel, populationObject, options),
    getMany: ms.getMany(salesModel, populationObject, options),
    findUpdateOrCreate: ms.findUpdateOrCreate(salesModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(salesModel, validationObject, populationObject, options),
    updateById: ms.updateById(salesModel, validationObject, populationObject, options),
    findIdAndDelete: ms.findIdAndDelete(salesModel, options),
    aggregate: ms.aggregate(salesModel, aggregate_pipeline, options),
}
