import handlebars from "handlebars";
import util from './common/Util';
import Constants from './common/ConstantsClient';

export default class Randomarray {
    constructor($el, type) {
        this.$el = $el;
        this.attachEvent();
    }
    attachEvent() {
        this.$el.on("click", "button", (e)=>this.sendMessage(e));
    }
    async sendMessage(e) {
        let $el = $(e.currentTarget);
        let messageResult = $("input", e.currentTarget.parentElement)[0].value.trim();

        if (messageResult.length < 1) {
            return;
        }

        if (messageResult.length > 500) {
            messageResult = messageResult.slice(0,500);
        }

        let resultId = $("#char_input")[0].value.trim() == "" ? "익명" : $("#char_input")[0].value.trim();
        let resultStr = this.makeMessageString(resultId, messageResult);
        let now = new Date();
        let resultDate = this.makeDateHumanTimeString(now);

        let postUrl = "/util/api/diceLog";
        let postData = {
            date: resultDate,
            result: resultStr
        };
        let result = await util.ajaxRequest("POST", postUrl, postData);
        if (result == "OK") {
            Constants.$DiceList.refreshList();
        }
    }

    makeMessageString(resultId, result) {
        return `${resultId} - ${result}`;
    }
    makeDateHumanTimeString(date) {
        return `(${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
    }
}
