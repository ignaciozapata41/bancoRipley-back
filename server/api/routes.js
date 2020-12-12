const express = require('express');

const app = express();

app.use(require('../api/authentication/authentication.router'));
app.use(require('../api/accountActions/accountActions.router'));

module.exports = app;