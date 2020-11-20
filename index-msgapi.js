/**
 * This snippet retrieves the conversations history for given conversation Id.
 * Parameters rquires: accountId, converationId, API key set to run Messaging Interaction API
 * Resources: https://developers.liveperson.com/messaging-interactions-api-overview.html
 * How to run:
 *  yarn install or npm install 
 *  node index-msgapi.js
 */
const request = require('request');
const data = {
  accountId: '75070123',
  conversationId: '<conversationid>',
  oauth:{
    consumer_key: '<CONSUMER KEY>',
    consumer_secret: '<CONSUMER SECRET>',
    token: '<ACCESS TOKEN>',
    token_secret: '<TOKEN SECRET> '
  },
}
//Get Service BaseURI
request(
    {url:`http://api.liveperson.net/api/account/${data.accountId}/service/baseURI.json?version=1.0`, method: 'GET'},
    (err, res, body) => {
      if(err){
        return err;
        console.log(err);
      }
      console.log(`Get Service BaseURI API Status = ${res.statusCode}${res.statusMessage}`);
      let resBody = JSON.parse(body).baseURIs;
      let msgApiBaseURI = resBody.find((element) =>{
        if(element.service == 'msgHist')
          return element;
      });
      console.log(msgApiBaseURI);
// });

  const options = {
    method: 'POST',
    url: `https://${msgApiBaseURI.baseURI}/messaging_history/api/account/${data.accountId}/conversations/conversation/search?v=2`,
    oauth: data.oauth,
    body: {
      conversationId: data.conversationId,
      contentToRetrive:["campaign", "messageRecords", "agentParticipants", "agentParticipantsLeave", "agentParticipantsActive", "consumerParticipants", "transfers", "interactions", "messageScores", "messageStatuses", "conversationSurveys", "coBrowseSessions", "summary", "sdes", "unAuthSdes", "monitoring", "dialogs", "responseTime", "skillChanges", "intents", "uniqueIntents", "latestAgentSurvey", "previouslySubmittedAgentSurveys"]
    },
    json: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(options,(err, res, body) => {
    if(err){
      console.log(err);
      return err;
    }
    console.log(`Msg interaaction API Response status = ${res.statusCode}${res.statusMessage}`);
    console.log(body);
  });
});
