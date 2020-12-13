const express = require('express');

const app = express();

/* app.use(require('../api/authentication/authentication.router'));  */
app.use(require('./userAccount/userAccActions.router'));

module.exports = app;