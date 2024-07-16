let ms = require('../helpers/apiato.helper')
const productsModel = require('../models/products.model')


//APIATO CONFIGURE
let validationObject = {}
let populationObject = false
let options = {}
let aggregate_pipeline_dt = []
let aggregate_pipeline = []


module.exports = {
    createOne: ms.createOne(productsModel, validationObject, populationObject, options),
    createMany: ms.createMany(productsModel, validationObject, populationObject, options),

    getOneWhere: ms.getOneWhere(productsModel, populationObject, options),
    getOneById: ms.getOneById(productsModel, populationObject, options),
    getMany: ms.getMany(productsModel, populationObject, options),

    findUpdateOrCreate: ms.findUpdateOrCreate(productsModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(productsModel, validationObject, populationObject, options),
    updateById: ms.updateById(productsModel, validationObject, populationObject, options),

    findIdAndDelete: ms.findIdAndDelete(productsModel, options),

    datatable_aggregate: async (req, res) => {


        try {

            let data = await productsModel.find().select('name price description image active stock')
            res.status(200).json({
                success: true,
                data: data
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e
            })
        }
    },
    aggregate: ms.aggregate(productsModel, aggregate_pipeline, options),
}
