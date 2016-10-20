
export default class Util {
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
