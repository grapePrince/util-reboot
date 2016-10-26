import handlebars from "handlebars";
import util from './Util';
import DiceList from './DiceList';

export default class Randomarray {
    constructor($el, type) {
        this.$el = $el;
        this.attachEvent();
    }
    attachEvent() {
        this.$el.on("click", "button", (e)=>this.rollDice(e));
    }
    async rollDice(e) {
        let $el = $(e.currentTarget);
        let diceType = $el.data("dicetype");
        let diceNumber;

        if (diceType == "fixed") {
            diceNumber = Number($el.data("number"));
        } else {
            diceNumber = $("input", e.currentTarget.parentElement)[0].value;
            diceNumber = util.decodeInputNumber(diceNumber, 100);
        }

        if (isNaN(diceNumber)) {
            alert("아 왜 숫자도 아닌걸 넣어요!? 다시 해요!");
            return;
        }

        let resultNum = Math.floor(Math.random() * diceNumber ) + 1;
        let resultStr = this.makeDiceResultString(resultNum, diceNumber);
        let now = new Date();
        let resultDate = this.makeDateHumanTimeString(now);

        let postUrl = "/api/diceLog";
        let postData = {
            date: resultDate,
            result: resultStr
        };
        let result = await util.ajaxRequest("POST", postUrl, postData);
        if (result == "OK") {
            DiceList.refreshList();
        }
    }

    makeDiceResultString(result, dimen) {
        return `${result} / 1d${dimen}`;
    }
    makeDateHumanTimeString(date) {
        return `(${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
    }
}
