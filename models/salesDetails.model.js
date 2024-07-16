const mongoose = require('mongoose')

const {Schema} = mongoose;

const productsModel = require('./products.model')

const saleDetailsModel = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: productsModel,
        required: false
    },
    stockAlMomento: {
        type: Number,
        required: false
    },
    cant: {
        type: Number,
        required: false
    },
    talla: {
        type: String,
        required: false
    },

    priceProduct: {
        type: Number,
        required: false
    },

    total_detalle: {
        type: Number,
        required: false
    },


}, {
    timestamps: true
})

module.exports = mongoose.model('saleDetails', saleDetailsModel)
