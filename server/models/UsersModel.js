const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    rut: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Users', UsersSchema, 'Users');