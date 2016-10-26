import handlebars from "handlebars";
import util from './Util';
import DiceList from './DiceList';

export default class Randomarray {
    constructor($el, type) {
        this.$el = $el;
        this.template = handlebars.compile(html);
        let data = {};
        if (type == "fromone") {
            data.fromone = true;
            data.fromnumber = false;
        } else {
            data.fromone = false;
            data.fromnumber = true;
        }
        $el.html(this.template(data));
        this.attachEvent($el);
    }
    attachEvent() {
        this.$el.on("click", "button", (e)=>this.randomArray(e));
    }
    async randomArray(e) {
        let $btn = $(e.currentTarget);
        let btnType = $el.data("btntype");
        let fromNum, toNum, resultArr, resultString;

        if (btnType == "fromone") {
            fromNum = 1;
        } else {
            fromNum = this.$el.$(".from_input")[0].value;
            fromNum = util.decodeInputNumber(fromNum, 1);
        }
        toNum = this.$el.$(".to_input")[0].value;
        toNum = util.decodeInputNumber(toNum, 100);

        if (isNaN(toNum) || isNaN(fromNum)) {
            alert("아 왜 숫자도 아닌걸 넣어요!? 다시 해요!");
            return;
        }
        if (fromNum > toNum) {
            alert("시작숫자는 끝숫자보다 작아야 합니다.");
            return;
        }

        resultArr = Array.from(new Array(fromNum - toNum + 1), (x, i) => i);
        resultArr = util.randomElementsFromArr(resultArr, resultArr.length, false);
        resultString = this.makeResultArrString(resultArr);

        let now = new Date();
        let resultDate = this.makeDateHumanTimeString(now);

        let postUrl = "/api/diceLog";
        let postData = {
            date: resultDate,
            result: resultString
        };

        let result = await util.ajaxRequest("POST", postUrl, postData);
        if (result == "OK") {
            DiceList.refreshList();
        }
    }
    makeResultArrString(arr) {
        let resultString = "[";
        arr.map((x) => {
            resultString += `${x}, `;
        });
        resultString = resultString.slice(0, resultString.length - 2);
        return resultString;
    }


}

const html =
    `<div class="form-group">
        <span style="padding-right:10px; {{#if fromnumber}} {{/if}}">1</span>
        <input data-type="{{#if fromone}}display:none;{{/if}}" class="form-control form-inline from_input" style="width:150px" placeholder="입력 안하면 100">
        ~
        <input class="form-control form-inline to_input" style="width:150px; {{#if fromone}}display:none;{{/if}}" placeholder="입력 안하면 1">
        <button data-btntype="{{#if fromone}}fromone{{else}}fromnumber{{/if}}" type="button" class="btn btn-default">굴리기</button>
    </div>`;