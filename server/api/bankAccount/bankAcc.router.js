const express = require("express");

const bankAccFuncs = require('./bankAcc.functions');

const app = express();

// Post
app.post('/api/pruebaRipley/bankAcc/chargeMount', bankAccFuncs.chargeMount);

module.exports = app;