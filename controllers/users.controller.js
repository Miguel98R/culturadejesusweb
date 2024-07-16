let usersModel = require('../models/users.model')
let userShippingModel = require('../models/userShipping.model')
let usersAddressModel = require('../models/userAddress.model')

let ms = require('../helpers/apiato.helper')
const {encrypt} = require('../helpers/handleBcrypt')
const {datatable_aggregate} = require("../helpers/dt_aggregate.helper");

//APIATO CONFIGURE
let validationObject = {}
let populationObject = false
let options = {}

let aggregate_pipeline = []


module.exports = {
    createAdmin: async (req, res) => {
        let body = req.body


        try {

            // Buscar si ya existe un usuario con el mismo correo electrónico o nombre de usuario
            let searchUser = await usersModel.findOne({$or: [{email: body.email}, {user_name: body.user_name}]});

            if (searchUser) {
                res.status(403).json({
                    success: false,
                    message: 'El usuario ya existe'
                })
                return
            }

            let passwordHash = await encrypt(body.password)

            let newUser = new usersModel({
                name: body.name,
                user_name: body.user_name,
                email: body.email,
                password: passwordHash,
                usersTypes: 'admin'

            })
            await newUser.save()
            res.status(200).json({
                success: true,
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e

            })
        }
    },
    createUsers: async (req, res) => {
        let body = req.body


        try {

            // Buscar si ya existe un usuario con el mismo correo electrónico o nombre de usuario
            let searchUser = await usersModel.findOne({$or: [{email: body.email}, {user_name: body.user_name}]});

            if (searchUser) {
                res.status(403).json({
                    success: false,
                    message: 'El usuario ya existe'
                })
                return
            }

            let passwordHash = await encrypt(body.password)

            let newUser = new usersModel({
                name: body.name,
                user_name: body.user_name,
                email: body.email,
                password: passwordHash,
                usersTypes: body.usersTypes,
                active: body.active

            })
            await newUser.save()
            res.status(200).json({
                success: true,
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e

            })
        }
    },
    datatable_aggregate: async (req, res) => {

        try {

            let dataUsers = await usersModel.find().select('user_name email name usersTypes active')
            res.status(200).json({
                success: true,
                data: dataUsers
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e
            })
        }
    },
    updateById: async (req, res) => {
        let {body} = req.body
        let {id} = req.params

        console.log(id)
        console.log(body)

        try {

            let userSearch = await usersModel.findById(id).select('user_name email name usersTypes password active')
            if (!userSearch) {
                res.status(404).json({
                    success: false,
                })
            }

            let password

            if (body.password == '' || body.password == undefined) {
                password = userSearch.password
            } else {
                password = await encrypt(body.password)

            }

            userSearch.user_name = body.user_name || userSearch.user_name;
            userSearch.email = body.email || userSearch.email;
            userSearch.name = body.name || userSearch.name;
            userSearch.password = password
            userSearch.usersTypes = body.usersTypes || userSearch.usersTypes;
            userSearch.active = body.active;


            await userSearch.save()

            res.status(200).json({
                success: true,
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e

            })
        }

    },
    getUserDataEmail: async (req, res) => {
        try {
            const {email} = req.params;


            const userSearch = await usersModel.findOne({email});

            if (!userSearch) {
                return res.status(404).json({success: false});
            }

            const user = await usersModel.aggregate([
                {$match: {email: userSearch.email}},
                {
                    $lookup: {
                        from: userShippingModel.collection.name,  // Reemplaza con el nombre real de la colección
                        localField: '_id',
                        foreignField: 'userConf',
                        as: 'shipping',
                    },
                },
                {$unwind: '$shipping'},
                {
                    $lookup: {
                        from: usersAddressModel.collection.name,  // Reemplaza con el nombre real de la colección
                        localField: 'shipping.userAddress',
                        foreignField: '_id',
                        as: 'address',
                    },
                },
                {$unwind: '$address'},
                {
                    $project: {
                        email: 1,
                        name: '$shipping.name',
                        lastName: '$shipping.lastName',
                        gender: '$shipping.gender',
                        cellphone: '$shipping.cellphone',
                        address: '$address.address',
                        noInt: '$address.noInt',
                        noExt: '$address.noExt',
                        neighborhood: '$address.neighborhood',
                        city: '$address.city',
                        state: '$address.state',
                        zip: '$address.zip',
                    },
                },
            ]).exec();

            if (!user || user.length === 0) {
                return res.status(404).json({success: false});
            }

            return res.status(200).json({success: true, user: user[0]});
        } catch (e) {
            console.error(e);
            return res.status(500).json({success: false, error: e});
        }
    },


    createMany: ms.createMany(usersModel, validationObject, populationObject, options),

    getOneWhere: ms.getOneWhere(usersModel, populationObject, options),
    getOneById: ms.getOneById(usersModel, populationObject, options),
    getMany: ms.getMany(usersModel, populationObject, options),

    findUpdateOrCreate: ms.findUpdateOrCreate(usersModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(usersModel, validationObject, populationObject, options),
    findIdAndDelete: ms.findIdAndDelete(usersModel, options),


    aggregate: ms.aggregate(usersModel, aggregate_pipeline, options),

}
