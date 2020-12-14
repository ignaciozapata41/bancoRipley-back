const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccHistorySchema = new Schema({
    amount: {
        type: Number,
    },
    transferType:{
        type:  String
    },
    origin: {
        type: String,
    },
    destination: {
        type: String, 
    }
}, { timestamps: true });

module.exports = mongoose.model('BankAccHistory', BankAccHistorySchema, 'BankAccHistory');