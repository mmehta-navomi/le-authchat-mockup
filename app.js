'use strict';

// requiring the service controller
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var jwt = require('jsonwebtoken');
var fs = require('fs');
// var axios = require('axios');
var app = express();
// var privkey = require('./privkey');
/**
 * ToDo: Generating private keys and public keys
 */

const privkeyloc = path.join('./', 'privkey.key');
const pubkeyloc = path.join('./', 'pubkey.key');
var privkey = fs.readFileSync(privkeyloc).toString('utf-8');
var pubkey = fs.readFileSync(pubkeyloc).toString('utf-8');
// console.log(privkey);
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Using some public files
// app.use(express.static('page.html'));
app.get('/page.html', function (req, res) {
  res.sendFile(path.join(__dirname,'page.html'));
})

// Define the port to run on
app.set('port', process.env.PORT || 8080);  // set environment variable PORT=443 to run app on https



var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
    console.log(`Server Listen on Port ${port}`);
});
var dateNow = Date.now();
console.log(`dateNow ${dateNow}`);
var dateExp = dateNow + 1542391;
var jwtConf = {
    "sub": "12312131321",
    "iss" : "https://www.example-brand.com",
    "exp" : dateExp,
    "iat" : dateNow
}

console.log('JWT payload==>',jwtConf);
console.log('typeof privkey==>',typeof privkey);
console.log('typeof pubkey==>',typeof pubkey);
// console.log('privkey',privkey);
// console.log('pubkey',pubkey);
//sign jwt
// var token = jwt.sign(jwtConf, privkey, { algorithm: 'RS256'}, function(err, token) {
app.get('/getjwt',(req, res) =>{
	var jwttoken = jwt.sign({}, privkey, jwtConf, function(err, token) {
		if(err){
			console.log('err==>',err);
		}else {
			//verify token
			var verify = jwt.verify(token,pubkey,function(err, decoded) {
				if(err){
					console.log('err==>',err);
				}else {
					console.log('Decoded.....JWT is VALID');
					//console.log('decoded token==>',decoded);
				}
			});
			res.status(200).json({"success":true,"c":token});
		}
	});
});
