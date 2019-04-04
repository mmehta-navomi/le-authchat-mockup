'use strict';

// requiring the service controller
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');


// var axios = require('axios');
var app = express();

var csrfProtection = csurf({ cookie: true });
// var privkey = require('./privkey');
/**
 * ToDo: Generating private keys and public keys
 */

const privkeyloc = path.join('./', 'privkey.key');
const pubkeyloc = path.join('./', 'pubkey.key');
const privkey = fs.readFileSync(privkeyloc).toString('utf-8');
const pubkey = fs.readFileSync(pubkeyloc).toString('utf-8');
// console.log(privkey);
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfProtection);

//Enable CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})
//Using some public files
// app.use(express.static('page.html'));
app.get('/page.html', function (req, res) {
  res.sendFile(path.join(__dirname,'page.html'));
})
app.get('/spage.html', function (req, res) {
  res.sendFile(path.join(__dirname,'spage.html'));
})
app.get('/alpha-page.html', function (req, res) {
  res.sendFile(path.join(__dirname,'alpha-page.html'));
})
app.get('/btnclick',csrfProtection, function (req, res) {
  res.send("button clicked....");
})
// Define the port to run on
app.set('port', process.env.PORT || 8080);  // set environment variable PORT=443 to run app on https


const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
    console.log(`Server Listen on Port ${port}`);
});
let dateNow = Math.round(Date.now()/1000);
console.log(`dateNow ${dateNow}`);
let twthrs = 24 * 60 * 60;
let dateExp = (dateNow + twthrs);
console.log(`dateExp ${dateExp}`);

// console.log('privkey',privkey);
// console.log('pubkey',pubkey);
//sign jwt
app.get('/getjwt',(req, res) =>{
	console.log(req.query);
	let jwtConf = {
	    "sub": req.query.visitor, //reprsent visitor; new value = new visitor
	    "iss" : "https://www.example.com",
	    "exp" : dateExp,
	    "iat" : dateNow
	}

	console.log('JWT payload==>',jwtConf);
	console.log('typeof privkey==>',typeof privkey);
	console.log('typeof pubkey==>',typeof pubkey);

	//generate jwt
	let token = jwt.sign(jwtConf, privkey, { algorithm: 'RS256'}, function(err, token) {
	// var jwttoken = jwt.sign({}, privkey, jwtConf, function(err, token) {
		if(err){
			console.log('err==>',err);
		}else {
			//verify token
			let verify = jwt.verify(token,pubkey,function(err, decoded) {
				if(err){
					console.log('err==>',err);
				}else {
					console.log('Decoded.....JWT is VALID');
					//console.log('decoded token==>',decoded);
				}
			});
			res.status(200).json({"success":true,"id_token":token});
		}
	});
});
