var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const mustacheExpress = require('mustache-express');
const models = require("./models");

var app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(session({
	secret: 'calico',
	resave: false,
	saveUninitialized: true,
}))

app.use(express.static('public'));
app.use(expressValidator());
//app.use('/admin', adminRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


app.get('/', function (req, res) {
	res.render('login') //redirect so user is required to login to continue
});

app.post('/login', function(req,res) {
	let user_name = req.body.user_name
	let password = req.body.password
	models.user.findOne({
		where: {
			user_name: user_name,
			password: password
		}
	})
	.then(function(user) {
		if (user.password === password && user.user_name === user_name)
			req.session.user_name = user_name;
			req.session.userId = user.id;
			req.session.authenticated = true;
		  res.redirect('/index');
	})
	.catch(function(error) {
		req.session.authenticated = false;
		res.redirect('/login');
	});	
	return req.session;
});

app.get('/signup', function(req,res) {
	res.render('signup');
});

app.post('/signup-route', function(req,res) {
	const user = models.user.build({
		user_name: req.body.user_name,
		password: req.body.password,
		display_name: req.body.display_name
	});
	user.save();
	res.render('login');
});

app.get('/index', function(req,res) {
	res.render('index');
});


app.listen(3000, function() {
	console.log('gabble application listening on port 3000')
});
