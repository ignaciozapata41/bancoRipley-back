const express = require('express');

const app = express();

app.use(require('../api/bankAccount/bankAcc.router'));
app.use(require('./userAccount/userAccActions.router'));

module.exports = app;