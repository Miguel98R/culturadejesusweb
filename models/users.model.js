const mongoose = require('mongoose');

const {Schema} = mongoose;


const usersSchema = new Schema({
    user_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    usersTypes: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        require: true,
        default: false

    }

}, {
    timestamps: true
})

module.exports = mongoose.model('users', usersSchema)
