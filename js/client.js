import 'babel-polyfill';
import DiceList from './modules/DiceList';
import DiceRoll from './modules/DiceRoll';
import RandomArray from './modules/RandomArray';

class Client {
	constructor() {
		if ($("#diceBody_container")) {
			this.initDice();
		}
	}
	initDice() {
        new RandomArray($("#randomArray_fromone"), "fromone");
        new RandomArray($("#randomArray_fromnumber"), "fromnumber");
		new DiceRoll($("#diceRoll_container"));
	}
}

new Client();



