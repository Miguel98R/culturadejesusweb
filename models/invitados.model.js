const mongoose = require('mongoose');

const invitadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

const Invitado = mongoose.model('Invitado', invitadoSchema);

module.exports = Invitado;
