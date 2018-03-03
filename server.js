const express	= require('express');
const bodyParser = require('body-parser');
const app	= express();
const sqlite3 = require("sqlite3").verbose()
// const db = new sqlite3.Database("culturocity.db")

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
	res.render('index');
});

app.listen(3000,function(){
	console.log("App Started on PORT 3000");
	console.log("http://localhost:3000")
});