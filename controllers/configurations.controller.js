let ms = require('../helpers/apiato.helper')
let configurationsModel = require('../models/configurations.model')


//APIATO CONFIGURE
let validationObject = {}
let populationObject = false
let options = {}
let aggregate_pipeline_dt = []
let aggregate_pipeline = []


module.exports = {
    getKeysPasarelas: async (req, res) => {
        try {
            let searchConf = await configurationsModel.find({
                description: {
                    $in: [
                        'webhook_secret_mp',
                        'private_Key_mp',
                        'public_Key_mp',
                        'webhook_secret_mp_sandbox',
                        'private_Key_mp_sandbox',
                        'public_Key_mp_sandbox',
                        'webhook_secret_paypal',
                        'private_Key_stripe',
                        'public_key_stripe',
                        'private_Key_stripe_sandbox',
                        'public_key_stripe_sandbox',
                        'webhook_secret_stripe',
                        'webhook_secret_stripe_sandbox',
                    ],
                },
            }).lean();

            console.log("searchConf", searchConf)

            return res.status(200).json({
                success: true,
                searchConf,
                production_ready_mp: eval(process.env.MERCADO_PAGO_PROD),
                production_ready_stripe: eval(process.env.STRIPE_PROD),

            });

        } catch (e) {
            return res.status(500).json({
                success: false,
                error: e
            });

        }
    },
    updateOrCreateKey: async (req, res) => {

        let body = req.body

        let message
        try {

            let searchConf = await configurationsModel.findOne({description: body.description})

            if (!searchConf) {
                await configurationsModel.create({
                    value: body.value,
                    description: body.description,
                })

                message = 'Registro creado'
            } else {
                searchConf.value = body.value
                await searchConf.save()

                message = 'Registro actualizado'

            }


            return res.status(200).json({
                success: true,
                message,
            })
        } catch (e) {
            console.log("--------------------------------------------------")
            console.log("error", e)
            return res.status(500).json({
                success: false,
                error: e
            })
        }
    },
    createOrUpdateConf: async (req, res) => {
        let body = req.body
        try {

            let searchConf = await configurationsModel.findOne({description: body.description})

            if (!searchConf) {
                await configurationsModel.create(body)
            } else {
                searchConf.value = body.value
                await searchConf.save()
            }

            res.status(200).json({
                success: true,

            })
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e
            })
        }
    },
    createOne: ms.createOne(configurationsModel, validationObject, populationObject, options),
    createMany: ms.createMany(configurationsModel, validationObject, populationObject, options),

    getOneWhere: ms.getOneWhere(configurationsModel, populationObject, options),
    getOneById: ms.getOneById(configurationsModel, populationObject, options),
    getMany: ms.getMany(configurationsModel, populationObject, options),

    findUpdateOrCreate: ms.findUpdateOrCreate(configurationsModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(configurationsModel, validationObject, populationObject, options),
    updateById: ms.updateById(configurationsModel, validationObject, populationObject, options),

    findIdAndDelete: ms.findIdAndDelete(configurationsModel, options),

    datatable_aggregate: ms.datatable_aggregate(configurationsModel, aggregate_pipeline_dt, ''),
    aggregate: ms.aggregate(configurationsModel, aggregate_pipeline, options),
}
