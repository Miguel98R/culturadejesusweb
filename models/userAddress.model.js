const mongoose = require('mongoose')
const {Schema} = mongoose;

const userAddressModel = new Schema({

    noExt: {
        type: String,
        required: false
    },
    noInt: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    neighborhood: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false,
        default:'México'
    },
    reference: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('userAddress', userAddressModel)
