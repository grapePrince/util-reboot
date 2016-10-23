import express from 'express';
import handlebars from "express3-handlebars";
import bodyParser from 'body-parser';
import path from "path";
import url from "url";
import fs from 'fs';
import mongoose from 'mongoose';

import Util from './modules/Util';

//db configuration
let dbUrl = "mongodb://localhost/util";
mongoose.connect(dbUrl);

// server configuration
let app = express();
app.engine('handlebars', handlebars({ defaultLayout:'layout' }));

__dirname = fs.realpathSync('.');
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'build'))); // dev
// app.use(express.static(__dirname)); // real

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3101);

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/dice', function(req, res) {
	let logList = [
		{ 
			date: "2016-05-03 01:05:03",
		    result: "2 / 1d3" 
		},
		{ 
			date: "2016-05-03 01:05:03",
		    result: "1 / 1d3" 
		},
		{ 
			date: "2016-05-03 01:05:03",
		    result: "3 / 1d3" 
		},
		{ 
			date: "2016-05-03 01:05:03",
		    result: "4 / 1d3" 
		}
	];
	res.render('dice', {logList: logList});
});

app.get('/api/diceLog', function(req, res) {
	console.log(req);
    res.end();
});

app.post('/api/diceLog', function(req,res){
	let pathname = Util.getPathName(req);
	let data = Util.getBodyData(req);
	let date = data.date;
	let result = data.result;
	console.log(pathname);
	console.log(date);
	console.log(result);

	let DiceLog = mongoose.model('DiceLog', { 
		date: String, 
		result: String 
	});

	let diceLog = new DiceLog({
		date: date,
		result: result
	});

	diceLog.save((err)=>{
		if (err) {
			console.log(err);
		} else {
			res.send("OK");
		}
	});
});


app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
