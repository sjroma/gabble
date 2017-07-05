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
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.get('/', function(req, res) {
	res.render('login')  //redirect so user is required to login to continue
});


app.listen(3000, function () {
	console.log('gabble application listening on port 3000')
});