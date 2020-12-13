const axios = require('axios');
const Users = require('../../models/UsersModel');
var jwt = require('jsonwebtoken');
const { response } = require('./accountActions.router');

require('../../config/config');

async function createNewUser(req,res){
    try{
        let user = await new Users(req.body);

        user.save((err, userSaved) =>{
            if(err && err.code === 11000) return res.status(500).send('El rut ingresado ya se encuentra registrado.'); 

            if(err) return res.status(500).send('Ha ocurrido un problema intentando crear el usuario'); 

            if(!userSaved) return res.status(404).send('No fue posible crear el usuario.');

            return res.status(200).send({
                data: userSaved,
                msg: 'Usuario creado exitosamente.',
            })
        });
    }catch(e){
        res.status(500).send({msg: "Error intentando crear usuario."});
        console.log("Ha ocurrido un error intentando crear un usuario", e.toString());
    }
}


async function login(req, res){
  var userRut = req.body.rut || '';
  var password = req.body.password || '';

  try{

    let user = await Users.findOne({rut: userRut})

    if(!user || (password != user.password)) res.status(401).send('El rut o la contraseña no corresponden');

    user.password = '....'
    
    let tokenData = user.toJSON();
    let token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60 * 60 * 24
    })

    res.send({
        msg: "OK",
        data: token,
    })
  }catch(e){
    res.status(500).send("Ha ocurrido un error intentando acceder a su cuenta.");
    console.log('Ha ocurrido un error cuando un usuario intento acceder a su cuenta', e.toString())
  }
}

module.exports = {
    createNewUser,
    login,
}