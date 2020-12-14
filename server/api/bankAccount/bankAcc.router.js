const express = require("express");

const bankAccFuncs = require('./bankAcc.functions');

const app = express();

// Post
app.put('/api/pruebaRipley/bankAcc/changeAmount', bankAccFuncs.changeAmount);
app.post('/api/pruebaRipley/bankAcc/getUserBankAcc', bankAccFuncs.getUserBankAcc);
app.put('/api/pruebaRipley/bankAcc/transferAmount', bankAccFuncs.transferAmount);

module.exports = app;