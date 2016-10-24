import 'babel-polyfill';
import Util from './modules/Util';
import Global from './modules/Global';

class Client {
	constructor() {
		if ($("#diceBody_container")) {
			this.initDice();
		}
	}
	initDice() {
		this.attachEventDice();
	}
	attachEventDice() {
		$("#diceRoll_container").on("click", "button", (e)=>this.rollDice(e));
	}
	rollDice(e) {
		let $el = $(e.currentTarget);
		let diceType = $el.data("dicetype");
		let diceNumber;

		if (diceType == "fixed") {
        	diceNumber = Number($el.data("number"));
		} else {
			diceNumber = $("input", e.currentTarget.parentElement)[0].value;
			if (diceNumber == "") {
				diceNumber = 100;
			} else {
				diceNumber = Number(diceNumber);
			}	
		}
		
		if (isNaN(diceNumber)) {
			alert("아 왜 숫자도 아닌걸 넣어요!? 다시 해요!");
			return;
		}

		let resultNum = Math.floor(Math.random() * diceNumber ) + 1;
		let resultStr = this.makeDiceResultHtml(resultNum, diceNumber);
		let now = new Date();
		let resultDate = this.makeDateHumanTime(now);
		
		let postUrl = "/api/diceLog";
		let postData = {
			date: resultDate,
			result: resultStr
		}

		Util.request("POST", postUrl, postData);
	}
	makeDiceResultHtml(result, dimen) {
		return `${result} / 1d${dimen}`;
	}
	makeDateHumanTime(date) {
		return `(${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
	}

	static randomElementsFromArr(arr, num, duplicate) {
		let i, results=[], tempArr=arr.slice();
		for (i=0; i<num ; i++) {
			let rand = Math.floor(Math.random()*tempArr.length);
			if (duplicate) {
				results[i] = tempArr[rand];
			} else {
				results[i] = tempArr.splice(rand, 1)[0];
			}
		} 
		return results;
	};
}

new Client();



