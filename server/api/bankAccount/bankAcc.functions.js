const axios = require('axios');
const { response } = require('express');
const BankAcc = require('../../models/BankAccountModel');

async function chargeMount(req,res){
    let acc_number = req.body.acc_number || '';
    let amount = req.body.amount || 0;
    try{
        if(!amount || !acc_number) return res.status(500).send("Ha ocurrido un problema intentando obtener el numero de cuenta o monto asociado a la cuenta actualizar");

        let userAccBank = await BankAcc.findOne({account_number: acc_number});
        if(userAccBank == undefined) return res.status(500).send("No se pudo encontrar la cuenta en nuestros registros.");

        userAccBank.amount = amount + userAccBank.amount;
        
        userAccBank.save((err, updatedAcc) => {
            if(err){
                console.log(err);
                return res.status(500).send("Ha ocurrido un error al actualizar la cuenta bancaria.");
            }

            return res.status(200).send({
                msg: 'ok',
                data: updatedAcc
            })
        });



    }catch(e){
        console.log('Ha ocurrido un error intentando cargar saldo en la cuenta de banco de un usuario', e);
        res.status(500).send('Ha ocurrido un error intentando cargar saldo en la cuenta de banco  nro: '+num_cuenta);
    }
}

async function createBankAcc(rut){
    try{
        let params = {
            account_number: `000-${rut}`,
            rut: rut,
            amount: 0,
            type: 1,
        }
    
        let newBankAcc = await new BankAcc(params);
        newBankAcc.save();

    }catch(e){
        console.log('Ha ocurrido un error cuando se intento crear una cuenta bancaria para un usuario nuevo.', e.toString());
    }
}

async function getUserBankAcc(req, res){
    let rut = req.body.rut || null;

    try{
        let userBankAcc = await BankAcc.find({account_number: `000-${rut}`}, {_id: 0, account_number: 1, amount: 1, type: 1, rut: 1})

        if(!userBankAcc) return res.status(500).send('No se ha podido encontrar la cuenta bancaria del usuario.');
    
        return res.status(200).send({
                    msg: 'ok',
                    data: userBankAcc
                })
    }catch(e){
        console.log('Ha ocurrido un error intentando obtener la cuenta de banco de un usuario', e);
        res.status(500).send('Ha ocurrido un error intentando obtener la cuenta de banco de un usuario');
    }

}

module.exports = {
    chargeMount,
    createBankAcc,
    getUserBankAcc,
}