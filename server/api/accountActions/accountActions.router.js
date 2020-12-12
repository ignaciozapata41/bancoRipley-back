const express = require("express");

const func = require('./accountActions.functions');

const app = express();


async function login(req, res){
    console.log('entre');
}

// Post
app.post('/api/pruebaRipley/users/login', login);


module.exports = app;