const mongoose = require('mongoose')

const {Schema} = mongoose;

const userModel = require('./users.model');
const userAddressModel = require('./userAddress.model');


const usersShoppingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino','Sin responder'],
        default: 'Masculino'
    },

    cellphone: {
        type: String,
        required: false
    },
    userConf: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: false
    },
    userAddress: {
        type: Schema.Types.ObjectId,
        ref: userAddressModel,
        required: false
    },
    count_sale:{
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('usersShoppings', usersShoppingsSchema)


