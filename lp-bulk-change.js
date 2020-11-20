const axios = require('axios');
const fs = require('fs');
const accountId = '';
const bearerToken = null;
const lpUser = '';
const lpPassword = '';
let timer = null; // Will hold a reference to the timer

/**
 * Acccount Login Function
 * @return {[type]} [return bearer token]
 */
function lelogin(){
   const loginURL = `https://va.agentvep.liveperson.net/api/account/${accountId}/login?v=1.3`;
   axios.post(loginURL,{"username": lpUser,"password": lpPassword})
   .then((response) =>{
      console.log(`login api status = ${response.status} ${response.statusText}`);
      bearerToken = `Bearer ${response.data.bearer}`;
      console.log(`bearerToken = ${bearerToken}`);
   })
   .catch((error) =>{
      console.log(`login api error`);
      console.log(error);
   });

}


//Execute API at defined internval
// timer = setInterval(createSkillFunc, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
// timer = setInterval(createAnEntryPoint, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
// timer = setInterval(createEngagment, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
//
/**
 * Create a skill
 * URL: https://va.ac.liveperson.net/api/account/<AccountID/configuration/le-users/skills?v=2.0
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
const skill_rawdata = fs.readFileSync('aimsSkillData.json');
const skill_jsondata = JSON.parse(skill_rawdata);
const write_skill_data = [];
function createSkillFunc(){
   let acctSkillsToAdd = skill_jsondata;
   let index = 0;    // Keeps track of which array element to show next
   const createSkillURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/skills?v=2.0`;

   let createSkillOptions = {
      method: 'POST',
      headers: { 'Authorization': bearerToken},
      data: acctSkillsToAdd[index]
   };
   console.log(`Processing Skill = ${acctSkillsToAdd[index].name}`);
   axios(createSkillURL, createSkillOptions)
      .then((response) =>{
         console.log(`Create Skill API status = ${response.status} ${response.statusText}`);
         console.log(`Created Skill =  name: ${response.data.name}, id: ${response.data.id}`);
         //push to array to write in file
         write_skill_data.push(response.data);
      })
      .catch((error) =>{
         console.log(`Create Skill API Error ......`);
         console.log(error);
         process.exit(0);
      });

      if(index === acctSkillsToAdd.length-1){
         console.log(`Last Index Processed ...`);
         console.log(`Last Index data = ${acctSkillsToAdd[index].name}`);
         console.log(`Writing into the file ...`);
         fs.writeFileSync(`./write_skillData__response_${dayjs().format('MM-DD-YYYY_HH:mm:ss')}.json`, JSON.stringify(write_skill_data));
         clearInterval(timer);  // Cancel the timer
      } else {
         console.log(`Shifting to next index ...`);
         acctSkillsToAdd.shift();
         // index++; // Increment the index so that the next time, we get the next country
      }
}

/**
 * Create an entrypoint
 * URL: https://va.ac.liveperson.net/api/account/<AccountID>/configuration/le-targeting/onsite-locations?v=3.0
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
 const entryPoint_rawdata = fs.readFileSync('aimsEntryPointData.json');
 const entryPoint_jsondata = JSON.parse(entryPoint_rawdata);
 const write_entryPoint_data = [];
function createAnEntryPoint(){
   let entryPointsToAdd = [];
   let index = 0;    // Keeps track of which array element to show next
   const crateEntryPointsURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-targeting/onsite-locations?v=3.0`;
   console.log(`Processing Entry Points = ${entryPointsToAdd[index].name}`);

   let crateEntryPointsBody = {
    "name": `${entryPointsToAdd[index].name}`,
    "description": null,
    "isSystemDefault": false,
    "conditionBoxes": [
        {
            "data": {
                "include": [
                    {
                        "sections": [
                            {
                                "name": `"${entryPointsToAdd[index].name}"`
                            }
                        ]
                    }
                ],
                "exclude": []
            },
            "type": 4
        }
    ],
    "appInstallationId": null
};

   let crateEntryPointsOptions = {
      method: 'POST',
      headers: { 'Authorization': bearerToken },
      data: crateEntryPointsBody
   };
   axios(crateEntryPointsURL, crateEntryPointsOptions)
      .then((response) =>{
         console.log(`Create Entry Points API status = ${response.status} ${response.statusText}`);
         console.log(`Created Entry Points =  name: ${response.data.name}, id: ${response.data.id}`);
         //push to array to write in file
         write_entryPoint_data.push(response.data);
      })
      .catch((error) =>{
         console.log(`Create Entry Point API Error ......`);
         console.log(error);
         process.exit(0);
      });

      if(index === entryPointsToAdd.length-1){
         console.log(`Last Index Processed ...`);
         console.log(`Last Index data = ${entryPointsToAdd[index].name}`);
         console.log(`Writing into the file ...`);
         fs.writeFileSync(`./write_entryPointsData__response_${dayjs().format('MM-DD-YYYY_HH:mm:ss')}.json`, JSON.stringify(write_entryPoint_data));
         clearInterval(timer);  // Cancel the timer
      } else {
         console.log(`Shifting to next index ...`);
         entryPointsToAdd.shift();
         index++; // Increment the index so that the next time, we get the next country
      }
}

/**
 * Create an engagament in specific campaign
 * URL: https://va.ac.liveperson.net/api/account/<AccountID>/configuration/le-campaigns/campaigns/<CampaignID/engagements?v=3.4
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
 const engagement_rawdata = fs.readFileSync('aimsEngagementData.json');
 const engagement_jsondata = JSON.parse(engagement_rawdata);
 const write_engagement_data = [];
function createEngagment(){
   let engagmentsToAdd = [];
   let index = 0;    // Keeps track of which array element to show next
   const crateEngagementURL = `https://va.ac.liveperson.net/api/account/${accountId}>/configuration/le-campaigns/campaigns/${campaignId}/engagements?v=3.4`;
   console.log(`Processing Entry Points = ${engagmentsToAdd[index].name}`);

   let createEngagmentBody = {
     "id": null,
     "name": "WNO-OCC-Where Is My Tech-MAN-Johnstown PA",
     "description": "",
     "weight": 0.5,
     "enabled": true,
     "deleted": false,
     "windowId": 2514733230,
     "isPopOut": false,
     "useSystemRouting": false,
     "renderingType": 0,
     "appInstallationId": null,
     "channel": 1,
     "showSmsPreSurveyOnMobile": false,
     "language": "en-US",
     "onsiteLocations": [
       2514724230
     ],
     "visitorBehaviors": [
       2490412930
     ],
     "source": 0,
     "isUnifiedWindow": true,
     "type": 6,
     "externalTargets": null,
     "displayInstances": [
       {
         "events": {
           "click": {
             "enabled": true,
             "target": "_blank"
           }
         },
         "presentation": {
           "background": {
             "color": "#0363AD",
             "image": ""
           },
           "border": {
             "radius": 30,
             "width": 0,
             "color": "transparent"
           },
           "size": {
             "width": "40",
             "height": "152"
           },
           "elements": {
             "images": [
               {
                 "imageUrl": "{galleryBasePath}/preview/chat/t2_c9_sn11_th4_s4_asset.png",
                 "alt": "",
                 "css": {
                   "left": 8,
                   "top": 113,
                   "zIndex": 600
                 }
               }
             ],
             "labels": [
               {
                 "text": "Message us",
                 "css": {
                   "color": "#ffffff",
                   "fontFamily": "Arial,Helvetica,sans-serif",
                   "fontSize": 16,
                   "fontStyle": "normal",
                   "fontWeight": "normal",
                   "left": -23,
                   "top": 53,
                   "transform": "rotate(270deg)",
                   "white-space": "nowrap",
                   "zIndex": 601
                 }
               }
             ]
           }
         },
         "macros": [],
         "displayInstanceType": 2,
         "enabled": true
       },
       {
         "events": {
           "click": {
             "enabled": true,
             "target": "_blank"
           }
         },
         "presentation": {
           "background": {
             "color": "transparent",
             "image": ""
           },
           "border": {
             "radius": 0,
             "width": 0,
             "color": "transparent"
           },
           "size": {
             "width": "40",
             "height": "152"
           },
           "elements": {}
         },
         "macros": [],
         "displayInstanceType": 1,
         "enabled": true
       },
       {
         "events": {
           "click": {
             "enabled": true,
             "target": "_blank"
           }
         },
         "presentation": {
           "background": {
             "color": "#0363AD",
             "image": ""
           },
           "border": {
             "radius": 30,
             "width": 0,
             "color": "transparent"
           },
           "size": {
             "width": "40",
             "height": "152"
           },
           "elements": {
             "images": [
               {
                 "imageUrl": "{galleryBasePath}/preview/chat/t2_c9_sn11_th4_s4_asset.png",
                 "alt": "",
                 "css": {
                   "left": 8,
                   "top": 113,
                   "zIndex": 600
                 }
               }
             ],
             "labels": [
               {
                 "text": "Message us",
                 "css": {
                   "color": "#ffffff",
                   "fontFamily": "Arial,Helvetica,sans-serif",
                   "fontSize": 16,
                   "fontStyle": "normal",
                   "fontWeight": "normal",
                   "left": -23,
                   "top": 53,
                   "transform": "rotate(270deg)",
                   "white-space": "nowrap",
                   "zIndex": 601
                 }
               }
             ]
           }
         },
         "macros": [],
         "displayInstanceType": 4,
         "enabled": true
       }
     ],
     "position": {
       "left": 0,
       "top": 0,
       "type": 6
     },
     "followMePages": 1,
     "followMeTime": 0,
     "timeInQueue": 0,
     "availabilityPolicy": 0,
     "conversationType": 1,
     "allowUnauthMsg": true,
     "connectorId": 2505208830,
     "skillId": 2514721130,
     "skillName": "WNO-OCC-Where Is My Tech-MAN-Johnstown PA",
     "viewErrors": 0,
     "subType": 24
   }

   let crateEngagementOptions = {
      method: 'POST',
      headers: { 'Authorization': bearerToken },
      data: createEngagmentBody
   };
   axios(crateEngagementURL, crateEngagementOptions)
      .then((response) =>{
         console.log(`Create Engagement API status = ${response.status} ${response.statusText}`);
         console.log(`Created Engagement =  name: ${response.data.name}, id: ${response.data.id}`);
         //push to array to write in file
         write_engagement_data.push(response.data);
      })
      .catch((error) =>{
         console.log(`Create Engagement API Error ......`);
         console.log(error);
         process.exit(0);
      });

      if(index === engagmentsToAdd.length-1){
         console.log(`Last Index Processed ...`);
         console.log(`Last Index data = ${engagmentsToAdd[index].name}`);
         console.log(`Writing into the file ...`);
         fs.writeFileSync(`./write_engagmentsData_response_${dayjs().format('MM-DD-YYYY_HH:mm:ss')}.json`, JSON.stringify(write_engagement_data));
         clearInterval(timer);  // Cancel the timer
      } else {
         console.log(`Shifting to next index ...`);
         engagmentsToAdd.shift();
         index++; // Increment the index so that the next time, we get the next country
      }
}

/**
 * Test Data Function
 * @type {Array}
 */
timer = setInterval(testarray, 100); // create skill every 3 seconds; adding interval to avoid brute force on api
const rawdata = fs.readFileSync('read_jsondatadump.json');
const jsondata = JSON.parse(rawdata);
 // console.log(jsondata);
const writeArray = [];
console.log(`Initial data length to process = ${jsondata.length}`);
function testarray(){
   let testarraydata = jsondata;
   let index = 0;    // Keeps track of which array element to show next

   console.log(`Current Array length during processing = ${testarraydata.length}`);
   console.log(`Processing Skill = ${testarraydata[index].name}`);
   console.log('Do something with data');
   writeArray.push(testarraydata[index]);
   if(index === testarraydata.length-1){
      console.log('Last Data processed ...');
      console.log(testarraydata[index]);
      clearInterval(timer);  // Cancel the timer
      // push last index before writing in the file
      fs.writeFileSync(`./write_jsondatadump_${dayjs().format('MM-DD-YYYY_HH:mm:ss')}.json`, JSON.stringify(writeArray));

   } else {
      // console.log(testarraydata[index]);
      // writeArray.push(testarraydata[index]);
      console.log(`shifting to next index in the array`);
      testarraydata.shift();
       // index++; // Increment the index so that the next time, we get the next country
   }
}
