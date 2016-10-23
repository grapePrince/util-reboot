import url from "url";

export default class Util {
	static getRequest(url, data) {
		let result;
		(async function() {
			result = await promisedRequst("GET", url, data);
		}());
		return result;
	};
	
	static postRequest(url, data) {
		let result;
		(async function() {
			result = await promisedRequst("POST", url, data);
		}());
		return result;
	};

	static getPathName(req) {
		let pathname = url.parse(req.url).pathname;
		pathname = pathname ? pathname.replace(/^\/|\/$/g, "") : "";
		return pathname;
	};

	static getBodyData(req) {
		return req.body;
	};

};


async function promisedRequst(type, url, data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: type,
			dataType: "json",
			cache: false,
			url: url,
			data: data,
		}).done((result) => {
			resolve(result);
		}).fail( function (jqXHR, textStatus, errorThrown) {
			console.log("request failed!");
 	    	console.log(jqXHR);
 	    	resolve({
 	    		jqXHR: jqXHR, 
 	    		textStatus: textStatus, 
 	    		errorThrown: errorThrown
 	    	});
 	    	//console.log(jqXHR.responseText);
 	    	//console.log(jqXHR.responseJSON);
 	    	//console.log(jqXHR.status);
 	    	//console.log(jqXHR.statusText;
 	    }).always(function() {
 	    	//$('#ly_loading').hide(); //안내 툴팁 보여주지 않
 	    	/*
 	    	if (option.url == "json/issue/list") {
 	    		$('ly_loading').hide();
 	    	} else if(option.url == "json/down/list") {
 	    		$('ly_loading').hide();
 	    	} else {	
 	    	}
 	    	*/
 	    });	
	});
}
