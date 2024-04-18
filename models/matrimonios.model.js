const mongoose = require('mongoose');

const matrimonioSchema = new mongoose.Schema({
    tipo: {type: String, enum: ['boda', 'renovación'], required: true}, // Campo para indicar si es boda o renovación
    novioEsposo: {
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        edad: {type: Number, required: true},
        celular: {type: String, required: true},
    },
    noviaEsposa: {
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        edad: {type: Number, required: true},
        celular: {type: String, required: true},
    },
    tienenHijos: {type: String, enum: ['no', 'si'], required: true},
    cantidadHijos: {type: Number, default: 0}
});

const Matrimonio = mongoose.model('Matrimonios', matrimonioSchema);

module.exports = Matrimonio;
