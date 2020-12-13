const express = require("express");

const acoountActionsFuncs = require('./accountActions.functions');

const app = express();

// Post
app.post('/api/pruebaRipley/users/newUser', acoountActionsFuncs.createNewUser);
app.post('/api/pruebaRipley/users/login', acoountActionsFuncs.login);


module.exports = app;