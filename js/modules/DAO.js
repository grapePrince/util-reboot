import Model from './modules/Model';

export default class DAO {
    static callDAO(_key, ...params) {
        let result;
        const keyFunc = {
            "addDiceLog": promisedAddDiceLog
        };
        try{
            (async function() {
                result = await keyFunc[_key](params);
            }());
        } catch(e) {
            return e;
        }
        return result;
    }
}
async function promisedAddDiceLog(_date, _result) {
    console.log(_date);
    console.log(_result);
    return new Promise((resolve, reject) => {
        let diceLog = new Model.DiceLog({
            date: _date,
            result: _result
        });
        diceLog.save((err)=>{
            if (err) {
                console.log(err);
            } else {
                resolve("OK");
            }
        });
    });
}