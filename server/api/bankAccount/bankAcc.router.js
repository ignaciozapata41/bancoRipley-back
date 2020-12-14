const express = require("express");

const bankAccFuncs = require('./bankAcc.functions');

const app = express();

app.put('/api/pruebaRipley/bankAcc/changeAmount', bankAccFuncs.changeAmount);
app.post('/api/pruebaRipley/bankAcc/getUserBankAcc', bankAccFuncs.getUserBankAcc);
app.put('/api/pruebaRipley/bankAcc/transferAmount', bankAccFuncs.transferAmount);
app.get('/api/pruebaRipley/bankAcc/getBankAccHistory', bankAccFuncs.getBankAccHistory);

module.exports = app;