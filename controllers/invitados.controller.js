let invitadosModel = require('../models/invitados.model'); // Importar el modelo de invitadosModel

let ms = require('../helpers/apiato.helper');

// Validaciones para los datos
let validationObject = {
    nombre: { type: 'string', required: true }
};

// Objeto de población
let populationObject = false;

// Opciones
let options = {};

// Pipeline para datatable
let aggregate_pipeline_dt = [];

// Pipeline para ruta personalizada
let aggregate_pipeline = [];

module.exports = {
    createInvitado: async (req, res) => {
        try {
            const {  invitados } = req.body;

            if (!invitados || invitados.length === 0) {
                return res.status(400).send({ error: 'Debe proporcionar al menos un nombre de invitado' });
            }

            // Guardar cada invitado en la base de datos
            for (let nombre of invitados) {
                const invitado = new invitadosModel({
                    nombre
                });
                await invitado.save();
            }

            res.status(201).send({ message: 'Invitados registrados correctamente' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    // Los métodos generados por apiato.helper para el modelo invitadosModel
    createOne: ms.createOne(invitadosModel, validationObject, populationObject, options),
    createMany: ms.createMany(invitadosModel, validationObject, populationObject, options),
    getOneWhere: ms.getOneWhere(invitadosModel, populationObject, options),
    getOneById: ms.getOneById(invitadosModel, populationObject, options),
    getMany: ms.getMany(invitadosModel, populationObject, options),
    findUpdateOrCreate: ms.findUpdateOrCreate(invitadosModel, validationObject, populationObject, options),
    findUpdate: ms.findUpdate(invitadosModel, validationObject, populationObject, options),
    updateById: ms.updateById(invitadosModel, validationObject, populationObject, options),
    findIdAndDelete: ms.findIdAndDelete(invitadosModel, options),
    datatable_aggregate: ms.datatable_aggregate(invitadosModel, aggregate_pipeline_dt, ''),
    aggregate: ms.aggregate(invitadosModel, aggregate_pipeline, options)
}
