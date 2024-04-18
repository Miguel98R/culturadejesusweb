let ms = require('../helpers/apiato.helper')
let matrimoniosModel = require('../models/matrimonios.model')

// Add here validations for push data
let validationObject = {}
// Add here Population system
let populationObject = false

// Add here options
let options = {}

// Add here pipeline for datatable
let aggregate_pipeline_dt = []

// Add here piepline for custom route
let aggregate_pipeline = []


module.exports = {
    createOne: ms.createOne(matrimoniosModel, validationObject, populationObject, options),
    createMany: ms.createMany(matrimoniosModel, validationObject, populationObject, options),

    getOneWhere: ms.getOneWhere(matrimoniosModel, populationObject, options),
    getOneById: ms.getOneById(matrimoniosModel, populationObject, options),
    getMany: ms.getMany(matrimoniosModel, populationObject, options),

    findUpdateOrCreate: ms.findUpdateOrCreate(matrimoniosModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(matrimoniosModel, validationObject, populationObject, options),
    updateById: ms.updateById(matrimoniosModel, validationObject, populationObject, options),

    findIdAndDelete: ms.findIdAndDelete(matrimoniosModel, options),

    datatable_aggregate: ms.datatable_aggregate(matrimoniosModel, aggregate_pipeline_dt, ''),
    aggregate: ms.aggregate(matrimoniosModel, aggregate_pipeline, options),
    // Nuevo endpoint para guardar un matrimonio
    createMatrimonio: async (req, res) => {
        try {
            // Verificar si el celular ya existe en la base de datos
            const celularExistente = await matrimoniosModel.findOne({
                $or: [
                    { 'novioEsposo.celular': req.body.novioEsposo.celular },
                    { 'noviaEsposa.celular': req.body.noviaEsposa.celular }
                ]
            });

            if (celularExistente) {
                return res.status(400).send({ error: 'El número de celular ya está registrado' });
            }

            // Si el celular no existe, crear y guardar el matrimonio
            const matrimonio = new matrimoniosModel(req.body);
            await matrimonio.save();
            res.status(201).send({ message: 'Matrimonio registrado correctamente' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

}