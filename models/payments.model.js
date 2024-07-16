const mongoose = require('mongoose');

const {Schema} = mongoose;



const paymentsSchema = new Schema({
    unique_id: {
        type: String,
        required: false,
    },
    client_id: {
        type: String,
        required: false,
    },
    collector_id: {
        type: String,
        required: false,
    },
    id_payment: {
        type: String,
        required: false,
    },
    operation_type: {
        type: String,
        required: false,
    },
    status_order:{
        type: String,
        required: false,
    },
    total: {
        type: Number,
        required: false,
    },
    url_payment: {
        type: String,
        required: false,
    },
    full_JSON:{
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    full_JSON_hook:{
        type: mongoose.Schema.Types.Mixed,
        required: false,
    }



}, {
    timestamps: true
})

module.exports = mongoose.model('payments', paymentsSchema)
