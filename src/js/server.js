import express from 'express';
import handlebars from "express3-handlebars";

// server configuration
let app = express();
app.engine('handlebars', handlebars({ defaultLayout:'index' }));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3101);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

/*
app.get('/about', function(req,res){
	var randomFortune = 
		fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('about', { fortune: randomFortune });
});
*/

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
