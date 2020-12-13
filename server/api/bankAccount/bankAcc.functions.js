const axios = require('axios');
const bankAcc = require('../../models/BankAccountModel');

async function chargeMount(res,req){

}

async function createBankAcc(rut){
    try{
        let params = {
            account_number: `000-${rut}`,
            rut: rut,
            amount: 0,
            type: 1,
        }
    
        let newBankAcc = await new bankAcc(params);
        newBankAcc.save();

    }catch(e){
        console.log('Ha ocurrido un error cuando se intento crear una cuenta bancaria para un usuario nuevo.', e.toString());
    }
}

module.exports = {
    chargeMount,
    createBankAcc
}