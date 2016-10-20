var mDao = require('./dao');
 
exports.getCardList = function(oReq, oRes, oQuery) {
	if (oQuery && oQuery.version) {
		mDao.getCardList(oReq, oRes, Number(oQuery.version));
	} else {
		console.log('getCardList : invalid version');
		oRes.writeHead(404, {"Content-Type": "text/plain"});
    	oRes.write("404 Not found");
    	oRes.end();
	}
};
