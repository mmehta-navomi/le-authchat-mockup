'use strict';
require('dotenv').config()

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
const { v4: uuidv4 } = require('uuid');
// var moment = require('moment');
const axios = require('axios');
// Load Chance
var Chance = require('chance');
// var axios = require('axios');
var app = express();

// const sendNotification = require('./sendNotification');
// const fetchMesssage = require('./fetchTranscript');

// Instantiate Chance so it can be used
var chance = new Chance();

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
// })

//Using some public files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/btnclick', function (req, res) {
      res.send("button clicked....");
})
// Define the port to run on
app.set('port', process.env.PORT || 3000);  // set environment variable PORT=443 to run app on https


const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
    console.log(`Server is Listening on Port ${port} ...`);
});


/** Generate Paylod for JWT **/
function generateJwt (info){

	let dateNow = Math.round(Date.now()/1000);
	// console.log(`dateNow ${dateNow}`);
	let monthexp = 30 * 24 * 60 * 60;
	let dateExp = (dateNow + monthexp);
	// console.log(`dateExp ${dateExp}`);
	console.log('JWT Create UTC= ', moment.utc(dateNow*1000).format('LLLL'));
	console.log('JWT Expire UTC= ', moment.utc(dateExp*1000).format('LLLL'));

	console.log(info);
	let jwtconf = {
	   "sub": uuidv4(),
	   "iss":"https://www.YourBrand.com",
	   "exp": dateExp,
	   "iat": dateNow,
	   "given_name": chance.name(),
	   "phone_number":"+1-10-344-3765333",
	   "lp_sdes":[
	      {
	         "type":"ctmrinfo",
	         "info":{
	            "cstatus":"cancelled",
	            "ctype":"vip",
	            "customerId":"138766AC",
	            "balance":-400.99,
	            "socialId":"11256324780",
	            "imei":"",
	            "userName":"user000",
	            "companySize":500,
	            "accountName":"bank corp",
	            "role":"broker",
	            "lastPaymentDate":{
	               "day":15,
	               "month":10,
	               "year":2014
	            },
	            "registrationDate":{
	               "day":23,
	               "month":5,
	               "year":2013
	            }
	         }
	      }
	  ]
  }

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
	jwt.sign(jwtConf, privkey, {keyid: 'VZEs_AItTzm_YlJb5K_dKFD3JrVSyf6Hzky665Q5YQM',algorithm: 'RS256'}, function(err, token) {
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

app.get('/health', (req, res)=>{
	console.log("calling /health");
	if(req.query.check == 'fail'){
		res.status(200).send("system is unhealthy");
		sendNotification('system is unhealthy');
	}else {
		res.status(200).send("system is healthy");
	}
})

app.get('/preevent', function(req, res){
	console.log(req.body);
	res.status(200).send("Good");
});
// Testing Redirect
app.post('/postevent', function(req, res){
	console.log(req.body);
	res.status(200).send("Good");
});

app.get('/user', function(req, res){
	console.log(req.originalUrl);
    res.send("Redirected to User Page");
});
