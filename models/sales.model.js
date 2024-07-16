const mongoose = require('mongoose')
const moment = require('moment')

const {Schema} = mongoose;

const saleDetailsModel = require('./salesDetails.model')
const shippingModel = require('./userShipping.model')
const paymentInfoModel = require('./payments.model')

const salesModel = new Schema({

    statusSale: { // PRV = PREVENTA , OR= ORDEN
        type: String,
        enum: ['PRV_sale', 'PRV_canceled', 'OR_sale','OR_send' ,'OR_historic', 'OR_canceled'],
        default: 'PRV_sale'
    },
    type_payout: { // PRV = PREVENTA , OR= ORDEN
        type: String,
        enum: ['transferencia', 'mercadoPago','stripe'],
        default: 'transferencia'
    },
    user_data: {
        type: Schema.Types.ObjectId,
        ref: shippingModel,
        required: false
    },

    details_sale: [{
        type: Schema.Types.ObjectId,
        ref: saleDetailsModel,
        required: true
    }],


    paymentInfo: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: paymentInfoModel,
        },
    payment_img: {
        type: String,
        required: false,
    },
    payment_status: {
        type: String,
        required: false,
    },

    cant_products: {
        type: Number,
        required: false
    },


    subtotal_sale: {
        type: Number,
        required: false
    },


    total_envio: {
        type: Number,
        required: false,
        default:0
    },

    total_sale: {
        type: Number,
        required: false
    },

    date_sale: {
        type: Date,
        required: false,
        default: moment().format()
    },
    date_shipment: {
        type: Date,
        required: false,

    },
    date_payment: {
        type: Date,
        required: false,

    },

}, {
    timestamps: true
})

module.exports = mongoose.model('sales', salesModel)
