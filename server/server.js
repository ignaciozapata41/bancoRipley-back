require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
});

app.options('*', cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))

//conexion con mongo con reintentos para cuando hay caidas
mongoose.connect(process.env.urlMongo, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoReconnect: true,
    reconnectTries: 10000,
    reconnectInterval: 1000
}).then(resp => {
    console.log('--------------------------------')
    console.log('CONEXION A MONGO ESTABLECIDA');
})

// Configuración global de rutas
app.use(require('./api/routes.js'));

app.listen(process.env.PORT, () => {
    console.log('AMBIENTE:    ' + process.env.AMBIENTE);
    console.log('URL NODE:     http://localhost:' + process.env.PORT);
    console.log('URL MONGO:   ' + process.env.urlMongo);
});