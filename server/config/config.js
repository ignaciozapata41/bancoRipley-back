// Lee archivo .env
const dotenv = require('dotenv');
const result = dotenv.config();

// validacion para evitar cargar todo si no esta creado el archivo .env
if (typeof process.env.AMBIENTE == "undefined") {
    console.log('Falta definir el ambiente en el archivo .env');
    console.log('renombre el archivo .env.default a .env');
    return
}

// Archivo para definir las variables de entorno que se ocuparan en todo el sitio web
if (process.env.AMBIENTE && process.env.AMBIENTE.trim() == 'pro') {
    console.log('PRODUCCION');
    process.env.urlMongo = `mongodb://ripley_user:ripley_pass@52.72.87.234:27017/ripley`;
} else {
    console.log('DESARROLLO');
    process.env.urlMongo = `mongodb://ripley_user:ripley_pass@52.72.87.234:27017/ripley`;
}
