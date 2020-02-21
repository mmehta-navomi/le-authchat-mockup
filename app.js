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
const cors = require('cors');
const helmet = require('helmet');
var moment = require('moment');

// var axios = require('axios');
var app = express();


app.use(helmet());
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
// var csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      	frameAncestors: [
        '*.le.liveperson.net'
		]
    }
  }
}));

const privkeyloc = path.join('./', 'privkey.key');
const pubkeyloc = path.join('./', 'pubkey.key');
const privkey = fs.readFileSync(privkeyloc).toString('utf-8');
const pubkey = fs.readFileSync(pubkeyloc).toString('utf-8');


//Enable CORS
// app.use((req, res, next) => {
// 	// res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Origin", "https://99b2bb6b.ngrok.io");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

// error handler
// app.use(function (err, req, res, next) {
// 	console.log(req.headers);
// 	console.log(err);
//   if (err.code !== 'EBADCSRFTOKEN') return next(err)
//
//   // handle CSRF token errors here
//   res.status(403)
//   res.send('page tampered with')
// })
//Using some public files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/btnclick', function (req, res) {
      res.send("button clicked....");
})
// Define the port to run on
app.set('port', process.env.PORT || 8080);  // set environment variable PORT=443 to run app on https


const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
    console.log(`Server is Listening on Port ${port} ...`);
});


/** Generate Paylod for JWT **/
function generateJwt (subinfo){

	let dateNow = Math.round(Date.now()/1000);
	// console.log(`dateNow ${dateNow}`);
	let monthexp = 30 * 24 * 60 * 60;
	let dateExp = (dateNow + monthexp);
	// console.log(`dateExp ${dateExp}`);
	console.log('JWT Create UTC= ', moment.utc(dateNow*1000).format('LLLL'));
	console.log('JWT Expire UTC= ', moment.utc(dateExp*1000).format('LLLL'));

	let jwtconf = {};
	jwtconf.sub = subinfo.visitor;
	jwtconf.iss = "https://www.example.com";
	jwtconf.iat = dateNow;
	jwtconf.exp = dateExp;
	jwtconf.aud = 'audiance'
	return jwtconf;
}
// console.log('privkey',privkey);
// console.log('privkey',privkey);
// console.log('pubkey',pubkey);
app.get('/getjwt',async (req, res) =>{
	console.log(`getjwt query------${JSON.stringify(req.query)}`);

	let jwtConf = await generateJwt(req.query);
	// let jwtConf = {
	//     "sub": req.query.visitor, //reprsent visitor; new value = new visitor
	//     "iss" : "https://www.example.com",
	//     "exp" : dateExp,
	//     "iat" : dateNow
	// }

	console.log('JWT payload==>');
	console.log(jwtConf);
	// console.log('typeof privkey==>',typeof privkey);
	// console.log('typeof pubkey==>',typeof pubkey);

	// sign jwt
	//generate jwt
	jwt.sign(jwtConf, privkey, { algorithm: 'RS256'}, function(err, token) {
		if(err){
			console.log('err==>',err);
		}else {
			console.log('JWT = ', token);
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
