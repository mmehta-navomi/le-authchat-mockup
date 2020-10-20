
let request = require('request');
data = {
  accountId: '82964465',
  conversationId: '1f115aec-76c6-4a2c-99c5-025a45049515'
}
const options = {
  method: 'post',
  url: 'https://sy.msghist.liveperson.net/messaging_history/api/account/82964465/conversations/conversation/search?v=2',
  oauth:{
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  },
  body: {
    conversationId: data.conversationId,
    contentToRetrive: ["messageRecords"],
  },
  json: true,
  headers: {
    "Content-Type": "application/json",
  },
};
request(options,(err, res, body) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Response status ${res.statusCode}`);
      console.log(body);
    }
});
