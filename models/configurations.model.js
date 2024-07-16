const mongoose = require('mongoose');

const {Schema} = mongoose;

const configurationSchema = new Schema({
    value: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('configurations', configurationSchema)
