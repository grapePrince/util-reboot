import 'babel-polyfill';
import Constants from './modules/common/ConstantsClient';
import DiceList from './modules/DiceList';
import DiceRoll from './modules/DiceRoll';
import RandomArray from './modules/RandomArray';
import Message from './modules/Message';

class Client {
	constructor() {
		if ($("#diceBody_container")) {
			this.initDice();
		}

	}
	initDice() {
        Constants.$DiceList = new DiceList();
		Constants.$Message = new Message($("#message_container"));
        Constants.$DiceRoll = new DiceRoll($("#diceRoll_container"));
        Constants.$RandomArrayOne = new RandomArray($("#randomArray_fromone"), "fromone");
        Constants.$RandomArrayNumber = new RandomArray($("#randomArray_fromnumber"), "fromnumber");
    }
}

new Client();



