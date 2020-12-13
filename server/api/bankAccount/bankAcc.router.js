const express = require("express");

const bankAccFuncs = require('./bankAcc.functions');

const app = express();

// Post
app.put('/api/pruebaRipley/bankAcc/chargeAmount', bankAccFuncs.chargeMount);
app.post('/api/pruebaRipley/bankAcc/getUserBankAcc', bankAccFuncs.getUserBankAcc);

module.exports = app;