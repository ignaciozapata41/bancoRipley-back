const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    account_number:{
        type: String,
        unique: true
    },
    rut: {
        type: String,
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', UsersSchema, 'BankAccount');