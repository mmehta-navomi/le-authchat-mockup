const axios = require('axios');
const fs = require('fs');

let rawdata = fs.readFileSync('jsondatadump.json');
let jsondata = JSON.parse(rawdata);
// console.log(jsondata);

const accountId = "75070123";
let bearerToken = null;
const loginURL = `https://va.agentvep.liveperson.net/api/account/${accountId}/login?v=1.3`;
//Call LE Login
   // lelogin()

let timer = null; // Will hold a reference to the timer
// let index = 0;    // Keeps track of which array element to show next

function lelogin(){
   axios.post(loginURL,{"username": "manan","password": "MM17navomi!!"})
   .then((response) =>{
      console.log(`login api status = ${response.status} ${response.statusText}`);
      bearerToken = `Bearer ${response.data.bearer}`;
      console.log(`bearerToken = ${bearerToken}`);
      // Get All Skills
      /*
      const getAllSkillsURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/skills?v=2.0`;
      const getAllSkillsOptions = {
         method: 'GET',
         headers: { 'Authorization': bearerToken }
      };
      axios(getAllSkillsURL, getAllSkillsOptions)
      .then((response) =>{
         console.log(`getAllSkills api status = ${response.status} ${response.statusText}`);
         console.log(response.headers);
      })
      .catch((error) =>{
         console.log(`getAllSkills api error`);
         console.log(error);
      });
      */
   })
   .catch((error) =>{
      console.log(`login api error`);
      console.log(error);
   });

}

//Internval
// timer = setInterval(deleteSkillFunc, 3000); // delete skill every 3 seconds; adding interval to avoid brute force on api
// timer = setInterval(createSkillFunc, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
// timer = setInterval(createAnEntryPoint, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
// timer = setInterval(createEngagment, 3000); // create skill every 3 seconds; adding interval to avoid brute force on api
timer = setInterval(testarray, 1000); // create skill every 3 seconds; adding interval to avoid brute force on api

/**
 * Create a skill
 * URL: https://va.ac.liveperson.net/api/account/<AccountID/configuration/le-users/skills?v=2.0
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
function createSkillFunc(){
   let accountSkills = [];

   let index = 0;    // Keeps track of which array element to show next

   console.log(acctSkills[index]);
   const createSkillURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/skills?v=2.0`;

   let skillapibody_simple = {"name":"testskill2","description":"testskill description2"};

   // let skillapibody = {"id":null,"name":"testskill","description":"testskill description","maxWaitTime":"120","skillRoutingConfiguration":[],"defaultPostChatSurveyId":null,"defaultOfflineSurveyId":null,"defaultAgentSurveyId":null,"wrapUpTime":null,"lobIds":[],"canTransfer":true,"skillTransferList":[],"slaDefaultResponseTime":null,"slaUrgentResponseTime":null,"slaFirstTimeResponseTime":null,"transferToAgentMaxWaitInSeconds":null,"workingHoursId":null,"specialOccasionId":null,"autoCloseInSeconds":null,"fallbackSkill":null,"fallbackWhenAllAgentsAreAway":true,"agentSurveyForMsgId":null,"agentSurveyForMsgTimeoutInMinutes":null,"redistributeLoadToConnectedAgentGroups":false}

   let createSkillOptions = {
      method: 'POST',
      headers: { 'Authorization': bearerToken, 'If-Match': '161' },
      data: skillapibody
   };
   axios(createSkillURL, createSkillOptions)
      .then((response) =>{
         console.log(`createSkill api status = ${response.status} ${response.statusText}`);
      // console.log(response.headers);
      })
      .catch((error) =>{
         console.log(`createSkill api error`);
         console.log(error);
         process.exit(0);
      });

      if(index === acctSkills.length-1){
         clearInterval(timer);  // Cancel the timer
      } else {
         index++; // Increment the index so that the next time, we get the next country
      }
}

function deleteSkillFunc(){
   let accountSkills = [{"deleted":false,"name":"sales","id":1246565814},{"deleted":false,"name":"service","id":1246573214},{"deleted":false,"name":"botskill","id":1603462930},{"deleted":false,"name":"demoskill","id":1604262530},{"deleted":false,"name":"navomibotskill","id":1794321430},{"deleted":false,"name":"home sales","id":1882061730},{"deleted":false,"name":"skill_00","id":1974246430},{"deleted":false,"name":"skill_01","id":1974246530},{"deleted":false,"name":"skill_02","id":1974246630},{"deleted":false,"name":"default_fallback_skill","id":2438473530},{"deleted":false,"name":"testskill","id":2495228230}];

   let index = 0;    // Keeps track of which array element to show next

   skillId = acctSkills[index].id;
   console.log(acctSkills[index]);
   // Delete skill by Id
   const deleteSkillURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-users/skills/${skillId}?v=2.0`;
   let deleteSkillOptions = {
      method: 'DELETE',
      headers: { 'Authorization': bearerToken, 'If-Match': '161', 'X-HTTP-Method-Override': 'DELETE' }
   };
   axios(deleteSkillURL, deleteSkillOptions)
      .then((response) =>{
         console.log(`deleteSkill api status = ${response.status} ${response.statusText}`);
      // console.log(response.headers);
      })
      .catch((error) =>{
         console.log(`deleteSkill api error`);
         console.log(error);
      });

   if(index === acctSkills.length-1){
      clearInterval(timer);  // Cancel the timer
   } else {
      index++; // Increment the index so that the next time, we get the next country
   }
}

/**
 * Create an entrypoint
 * URL: https://va.ac.liveperson.net/api/account/<AccountID>/configuration/le-targeting/onsite-locations?v=3.0
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
function createAnEntryPoint(){
   let entryPointsInfo = [];
   let index = 0;    // Keeps track of which array element to show next

   console.log(entryPointsInfo[index]);
   const crateEntryPointsURL = `https://va.ac.liveperson.net/api/account/${accountId}/configuration/le-targeting/onsite-locations?v=3.0`;

   let crateEntryPointsBody = {
    "name": "Test Entry Point 3",
    "description": "Test Entry Point 3 Description",
    "isSystemDefault": false,
    "conditionBoxes": [
        {
            "data": {
                "include": [
                    {
                        "sections": [
                            {
                                "name": "\"test-page-3\""
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
         console.log(`create entrypoint api status = ${response.status} ${response.statusText}`);
      // console.log(response.headers);
      })
      .catch((error) =>{
         console.log(`create entrypoint api error`);
         console.log(error);
         process.exit(0);
      });

      if(index === acctSkills.length-1){
         clearInterval(timer);  // Cancel the timer
      } else {
         index++; // Increment the index so that the next time, we get the next country
      }
}

/**
 * Create an engagament in specific campaign
 * URL: https://va.ac.liveperson.net/api/account/<AccountID>/configuration/le-campaigns/campaigns/<CampaignID/engagements?v=3.4
 * Please be careful using this URL and use it wisely; Do not brute the API call
 */
function createEngagment(){
   let engagmentInfo = [];
   let index = 0;    // Keeps track of which array element to show next

   console.log(entryPointsInfo[index]);
   const crateEntryPointsURL = `https://va.ac.liveperson.net/api/account/${accountId}>/configuration/le-campaigns/campaigns/${campaignId}/engagements?v=3.4`;

   let createEngagmentBody = {
      "id":null,
      "name":`${engagmentName}`,
      "description":"",
      "weight":0.5,
      "enabled":true,
      "deleted":false,
      "windowId":`${engagmentWindowId}`,
      "isPopOut":false,
      "useSystemRouting":false,
      "renderingType":0,
      "appInstallationId":null,
      "channel":1,
      "showSmsPreSurveyOnMobile":false,
      "language":"en-US",
      "onsiteLocations":[
         `${engagmentEntryPoint}`
      ],
      "visitorBehaviors":[
         `${engagmentBehaviorId}`
      ],
      "source":0,
      "isUnifiedWindow":true,
      "type":6,
      "externalTargets":null,
      "displayInstances":[
         {
            "events":{
               "click":{
                  "enabled":true,
                  "target":"_blank"
               }
            },
            "presentation":{
               "background":{
                  "color":"#0363AD",
                  "image":""
               },
               "border":{
                  "radius":30,
                  "width":0,
                  "color":"transparent"
               },
               "size":{
                  "width":"40",
                  "height":"152"
               },
               "elements":{
                  "images":[
                     {
                        "imageUrl":"{galleryBasePath}/preview/chat/t2_c9_sn11_th4_s4_asset.png",
                        "alt":"",
                        "css":{
                           "left":8,
                           "top":113,
                           "zIndex":600
                        }
                     }
                  ],
                  "labels":[
                     {
                        "text":"Message us",
                        "css":{
                           "color":"#ffffff",
                           "fontFamily":"Arial,Helvetica,sans-serif",
                           "fontSize":16,
                           "fontStyle":"normal",
                           "fontWeight":"normal",
                           "left":-23,
                           "top":53,
                           "transform":"rotate(270deg)",
                           "white-space":"nowrap",
                           "zIndex":601
                        }
                     }
                  ]
               }
            },
            "macros":[

            ],
            "displayInstanceType":2,
            "enabled":true
         },
         {
            "events":{
               "click":{
                  "enabled":true,
                  "target":"_blank"
               }
            },
            "presentation":{
               "background":{
                  "color":"#0363AD",
                  "image":""
               },
               "border":{
                  "radius":30,
                  "width":0,
                  "color":"transparent"
               },
               "size":{
                  "width":"40",
                  "height":"152"
               },
               "elements":{
                  "images":[
                     {
                        "imageUrl":"{galleryBasePath}/preview/chat/t2_c9_sn11_th4_s4_asset.png",
                        "alt":"",
                        "css":{
                           "left":8,
                           "top":113,
                           "zIndex":600
                        }
                     }
                  ],
                  "labels":[
                     {
                        "text":"Message us",
                        "css":{
                           "color":"#ffffff",
                           "fontFamily":"Arial,Helvetica,sans-serif",
                           "fontSize":16,
                           "fontStyle":"normal",
                           "fontWeight":"normal",
                           "left":-23,
                           "top":53,
                           "transform":"rotate(270deg)",
                           "white-space":"nowrap",
                           "zIndex":601
                        }
                     }
                  ]
               }
            },
            "macros":[

            ],
            "displayInstanceType":1,
            "enabled":true
         },
         {
            "events":{
               "click":{
                  "enabled":true,
                  "target":"_blank"
               }
            },
            "presentation":{
               "background":{
                  "color":"#0363AD",
                  "image":""
               },
               "border":{
                  "radius":30,
                  "width":0,
                  "color":"transparent"
               },
               "size":{
                  "width":"40",
                  "height":"152"
               },
               "elements":{
                  "images":[
                     {
                        "imageUrl":"{galleryBasePath}/preview/chat/t2_c9_sn11_th4_s4_asset.png",
                        "alt":"",
                        "css":{
                           "left":8,
                           "top":113,
                           "zIndex":600
                        }
                     }
                  ],
                  "labels":[
                     {
                        "text":"Message us",
                        "css":{
                           "color":"#ffffff",
                           "fontFamily":"Arial,Helvetica,sans-serif",
                           "fontSize":16,
                           "fontStyle":"normal",
                           "fontWeight":"normal",
                           "left":-23,
                           "top":53,
                           "transform":"rotate(270deg)",
                           "white-space":"nowrap",
                           "zIndex":601
                        }
                     }
                  ]
               }
            },
            "macros":[

            ],
            "displayInstanceType":4,
            "enabled":true
         }
      ],
      "position":{
         "left":0,
         "top":0,
         "type":6
      },
      "followMePages":1,
      "followMeTime":0,
      "timeInQueue":0,
      "availabilityPolicy":0,
      "conversationType":1,
      "connectorId":1582700814,
      "allowUnauthMsg":true,
      "skillId":`${engagmentSkillId}`,
      "skillName": `${engagmentSkillName}`,
      "viewErrors":0,
      "subType":24
   }

   if(index === acctSkills.length-1){
      clearInterval(timer);  // Cancel the timer
   } else {
      index++; // Increment the index so that the next time, we get the next country
   }
}

function testarray(){
   let testarraydata = jsondata.data;
   let index = 0;    // Keeps track of which array element to show next

   console.log(`array length during processing = ${testarraydata.length}`);
   console.log(testarraydata[index]);

   if(index === testarraydata.length-1){
      console.log(`array length during last = ${testarraydata.length}`);
      clearInterval(timer);  // Cancel the timer
   } else {
      console.log(`array length after shift = ${testarraydata.length}`);
      testarraydata.shift();
      // index++; // Increment the index so that the next time, we get the next country
   }
}
