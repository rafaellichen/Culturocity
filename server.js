const express	= require('express');
const bodyParser = require('body-parser');
const app	= express();
const sqlite3 = require("sqlite3").verbose();
const md5 = require('js-md5');
const db = new sqlite3.Database("culturocity.db")

app.set('view engine', 'pug')

app.get('/',function(req,res){
	db.all('SELECT * FROM museums', function(err, ans) {
		if (ans) temp=true
		else temp=false
		res.render('index', {AllMuseums: ans, AllResult: temp});
	})
});

app.get('/name',function(req,res){
	res.render('name');
});

app.get('/signup',function(req,res){
	res.render('signup');
});

app.get('/signup/:username/:password', function(req,res) {
	username = req.params.username
	password = req.params.password
	db.all("SELECT username FROM users", function(err, data) {
		var duplicate = false;
		for(var i=0; i<data.length; i++) {
			if(data[i].username==username) {
				duplicate = true;
				break;
		  	}
		}
		if(!duplicate) {
		  	const str2md5 = md5(password)
		  	const sql = "INSERT INTO users (username,password_digest) VALUES (?)"
		  	db.run(sql.replace("?",'"'+username+'","'+str2md5+'"'),function(err) {});
		}
		if(duplicate) {
			res.send({Message: "Username Already Exist", val: false})
		} else {
			res.send({Message: "Registration Successful", val: true})
		}
	})
});

app.get('/login/:username/:password', function(req,res) {
	username = req.params.username
	password = req.params.password
	const sql = "SELECT username,password_digest FROM users WHERE username=?"
  	db.all(sql.replace("?",'"'+username+'"'),function(err, data) {
		if(err) {
			console.log("ERROR!")
		} else {
			if(data.length) {
				const str2md5 = md5(password)
				if(str2md5===data[0].password_digest) {
					res.send({message: "LogIn Successful", username: data[0].username, password: data[0].password_digest.slice(0,11), val: true})
				}
			} else {
				res.send({message: "Username or Password is incorrect", val: false})
			}
			console.log("DONE!")
		}
  	});
});

app.get('/login',function(req,res){
	res.render('login');
});

app.get('/borough',function(req,res){
	db.all('SELECT * FROM boroughs', function(err, ans) {
		if (ans) temp=true
		else temp=false
		res.render('borough', {AllBorough: ans, BoroughResult: temp});
	})
});

app.get('/name/:str',function(req,res){
	searchName = req.params.str
	db.all("SELECT * FROM museums WHERE NAME LIKE "+'"'+"%"+searchName+"%"+'"', function(err, ans) {
		if(ans) temp=true
		else temp=false
		res.render('name', {AllName: ans, NameResult: temp});
	})
});

app.get('/borough/:str',function(req,res){
	BoroughName = req.params.str
	bx = [10453, 10457, 10460, 10458, 10468, 10451, 10452, 10456, 10454, 10455, 10459, 10474, 10463, 10471, 10466, 10469, 10470, 10475, 10461, 10462, 10464, 10465, 10472, 10473]
	bk = [10461, 10462, 10464, 10465, 10472, 10473, 11209, 11214, 11228, 11204, 11218, 11219, 11230, 11234, 11236, 11239, 11223, 11224, 11229, 11235, 11201, 11205, 11215, 11217, 11231, 11203, 11210, 11225, 11226, 11207, 11208, 11211, 11222, 11220, 11232, 11206, 11221, 11237]
    mh = [10026, 10027, 10030, 10037, 10039, 10001, 10011, 10018, 10019, 10020, 10036, 10029, 10035, 10010, 10016, 10017, 10022, 10012, 10013, 10014, 10004, 10005, 10006, 10007, 10038, 10280, 10002, 10003, 10009, 10021, 10028, 10044, 10065, 10075, 10128, 10023, 10024, 10025, 10031, 10032, 10033, 10034, 10040]
    qn = [11361, 11362, 11363, 11364, 11354, 11355, 11356, 11357, 11358, 11359, 11360, 11365, 11366, 11367, 11412, 11423, 11432, 11433, 11434, 11435, 11436, 11101, 11102, 11103, 11104, 11105, 11106, 11374, 11375, 11379, 11385, 11691, 11692, 11693, 11694, 11695, 11697, 11004, 11005, 11411, 11413, 11422, 11426, 11427, 11428, 11429, 11414, 11415, 11416, 11417, 11418, 11419, 11420, 11421, 11368, 11369, 11370, 11372, 11373, 11377, 11378]
    si = [10302, 10303, 10310, 10306, 10307, 10308, 10309, 10312, 10301, 10304, 10305, 10314]
	db.all("SELECT * FROM museums", function(err, ans) {
		if(ans) temp=true
		else temp=false
		final = []
		ans.forEach(element => {
			if(BoroughName == "Queens")
				if(qn.includes(Number(element.ZIP)))
					final.push(element)
			if(BoroughName == "Manhattan")
				if(mh.includes(Number(element.ZIP)))
					final.push(element)
			if(BoroughName == "Staten Island")
				if(si.includes(Number(element.ZIP)))
					final.push(element)
			if(BoroughName == "Brooklyn")
				if(bk.includes(Number(element.ZIP)))
					final.push(element)
			if(BoroughName == "Bronx")
				if(bx.includes(Number(element.ZIP)))
					final.push(element)
		});
		res.render('borough', {BoroughSearch: final, BoroughSearchResult: temp});
	})
});

app.listen(3000,function(){
	console.log("App Started on PORT 3000");
	console.log("http://localhost:3000")
});