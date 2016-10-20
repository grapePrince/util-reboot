var mUrl = require("url");
var mRequestHandlers = require("./requestHandlers");

//var sApi = "plotgame/api";
var oHandle = [];
oHandle["cardList/get"] = mRequestHandlers.getCardList;

function route(oReq, oRes) {
	var sPath = mUrl.parse(oReq.url).pathname;
	sPath = sPath ? sPath.replace(/^\/|\/$/g, "") : "";
	var oQuery = oReq.query;

	if (oHandle[sPath]) {
		oHandle[sPath](oReq, oRes, oQuery);
	} else {
    	console.log("No request handler found for " + sPath);
    	oRes.writeHead(404, {"Content-Type": "text/plain"});
    	oRes.write("404 Not found");
    	oRes.end();
  	}
}

exports.route = route;