var mMysql = require('mysql');
var mCom = require('./common');
var mConn = mMysql.createPool({
    connectionLimit : 100, //important
  	host     : '127.0.0.1',
  	user     : 'rahata',
  	password : 'latte!23',
  	database : 'plotgame'
});

exports.getCardList = function(oReq, oRes, nVer) {	
	var sQuery = 'select category, name, version from Card join Configuration where version >= ' + mMysql.escape(nVer) + ';';
	getResult(sQuery, getCardListCallback.bind(this, oRes, nVer));    
};

function getCardListCallback(oRes, nVer, rows) {
	console.log(nVer);
	var i, nLen,
	    oResult = {},
	    oCardList = {},
	    row;
	if (rows && rows.length > 0) {
    	for (i = 0, nLen = mCom.nCategory ; i < nLen ; i++) {
    		oCardList[i] = [];    	
    	}
    	for (i = 0, nLen = rows.length ; i < nLen ; i++) {
    		row = rows[i];
    		oCardList[row.category].push(row.name);
    	}
    	oResult.cardList = oCardList;
    	oResult.version = rows[0].version;
    	oRes.json(oResult);
    } else {
    	oResult.cardList = [];
    	oResult.version = nVer;
    	oRes.json(oResult);
    }
};

function getResult(sQuery, fCallback) {
    mConn.getConnection(function(err,conn){
        if (err) {
          conn.release();
          oRes.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        conn.on('error', function(err) {      
              oRes.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });   
        console.log('connected as id ' + conn.threadId);
        conn.query(sQuery,function(err,rows){
            conn.release();
            if(!err) {
            	fCallback.call(this, rows);
            }           
        });
  });
};