const axios = require('axios');
const { response } = require('express');
const BankAcc = require('../../models/BankAccountModel');
const BankAccHistory = require('../../models/BankAccHistoryModel');
const e = require('express');

async function changeAmount(req,res){
    let acc_number = req.body.acc_number || '';
    let amount = req.body.amount || 0;
    let type = req.body.type;

    try{
        if(!amount || !acc_number) return res.status(500).send("Ha ocurrido un problema intentando obtener el numero de cuenta o monto asociado a la cuenta actualizar");

        let userAccBank = await BankAcc.findOne({account_number: acc_number});
        if(userAccBank == undefined) return res.status(500).send("No se pudo encontrar la cuenta en nuestros registros.");

        userAccBank.amount = type === 'withdraw'?  (userAccBank.amount - amount) : (amount + userAccBank.amount);
        
        userAccBank.save(async (err, updatedAcc) => {
            if(err){
                console.log('Error actualizando el monto de una cuenta', err);
                return res.status(500).send("Ha ocurrido un error al actualizar la cuenta bancaria.");
            }

            await setBankAccHistory(type, amount, userAccBank.account_number, null);

            return res.status(200).send({
                msg: 'ok',
                data: updatedAcc
            })
        });

    }catch(e){
        console.log('Ha ocurrido un error intentando cambiar el monto en la cuenta de banco de un usuario', e);
        res.status(500).send('Ha ocurrido un error intentando actualizar el monto en la cuenta de banco  nro: '+num_cuenta);
    }
}

async function transferAmount(req,res){
    let destinationRut = req.body.destinationRut || '';
    let amount = req.body.amount || 0;
    let rutOrigin = req.body.rutOrigin || '';

    try{
        let destinationBankAcc = await BankAcc.findOne({rut: destinationRut});

        if(!destinationBankAcc) return res.status(404).send("No se ha encontrado la cuenta de destino. Favor verificar rut ingresado");

        destinationBankAcc.amount = destinationBankAcc.amount + amount;

        destinationBankAcc.save(async (err, destinationBankAccSaved) => {
            if(err){
                console.log('Error al realizar una transferencia', err);
                return res.status(500).send("Ha ocurrido un error al actualizar la cuenta bancaria.");
            }

            let originBankAcc = await BankAcc.findOne({rut: rutOrigin});
            originBankAcc.amount = (originBankAcc.amount - amount);
            originBankAcc.save();

            await setBankAccHistory('transfer', amount, originBankAcc.account_number, destinationBankAccSaved.account_number);

            return res.status(200).send({
                msg: 'ok',
                data: originBankAcc
            })

        });
    }catch(e){
        console.log('Ha ocurrido un error intentando transferir el saldo en la cuenta del destinatario', e);
        res.status(500).send('Ha ocurrido un error intentando transferir el saldo en la cuenta del destinatario: ');
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

async function setBankAccHistory(transferType, amount, origin, destination ){
    try{
        let newBankAccHistory = await new BankAccHistory({transferType, amount, origin, destination})
        newBankAccHistory.save();
    }catch(e){
        console.log('Han ocurrido errores intentando crear el historial para un movimiento en particular', e);
    }
}

async function getBankAccHistory(req,res){
    let userAccount = req.query.acc_number;

    try{
        let arrayHistorys = [];

        let historyMovements = await BankAccHistory.find({$or: [{origin: userAccount}, {destination: userAccount}]}).sort({createdAt: 1})

        for(let el of historyMovements){
            arrayHistorys.push({
                transferType: el.transferType,
                amount: el.amount,
                origin: el.origin,
                destination: el.destination,
                createdAt: el.createdAt,
                outMovement: el.destination === userAccount? true : false,
            })
        }

        return res.status(200).send({
            msg: 'ok',
            data: arrayHistorys
        })
        
    }catch(e){
        console.log('Error intentando obtener el historial de movimientos de la cuenta nro '+userAccount, e);
        return res.status(500).send('Ha ocurrido un error intentando obtener el historial de movimientos');
    }
}

module.exports = {
    changeAmount,
    createBankAcc,
    getUserBankAcc,
    transferAmount,
    getBankAccHistory,
}