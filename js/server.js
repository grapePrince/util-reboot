import express from 'express';
import handlebars from "express3-handlebars";
import path from "path";
import fs from 'fs';

// server configuration
let app = express();
app.engine('handlebars', handlebars({ defaultLayout:'pc' }));

__dirname = fs.realpathSync('.');
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'build'))); // dev
// app.use(express.static(__dirname)); // real

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3101);

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/dice', function(req, res) {
	let logList = `
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람1</td>
			<td>안녕하세요?</td>
		</tr>
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>네 안녕하세요.</td>
		</tr>
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>네 안녕하세요.</td>
		</tr>
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>네 안녕하세요.</td>
		</tr>
		<tr>   
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>주사위 : 2 / 1d3</td>
		</tr>
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>네 안녕하세요.</td>
		</tr>
		<tr>
			<td>2016-05-03 01:05:03</td>
			<td>사람2</td>
			<td>네 안녕하세요.</td>
		</tr>
		`;
	res.render('dice', {logList: logList});
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
