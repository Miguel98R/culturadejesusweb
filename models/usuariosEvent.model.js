const mongoose = require('mongoose')
let Schema = mongoose.Schema


let usersEvent = new Schema({

    nombre: {
        type: String,
        required: false
    },
    apellido: {
        type: String,
        required: false

    },
    edad: {
        type: String,
        required: false

    },
    phone: {
        type: Number,
        required: false,

    },
    email: {
        type: String,
        required: false,

    },
    congregacion: {
        type: Boolean,
        required: false,


    },


}, {timestamps: true})


module.exports = new mongoose.model('usersEvent', usersEvent)
