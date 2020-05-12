const axios = require('axios');

// POST monitoring api /report method
let url  = "https://va.v.liveperson.net/api/account/75070123/app/b63fa9ce-28a5-452a-80a2-b0e0d043ee37/report?v=1.1&obh=true";

let options = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json'},
  data: {
   "identities": [
     {
          "iss": "75070123",
          "acr": "0",
          "sub": "2ae6ba3c-f826-43db-98a3-488cdfebe476"
      }
   ],"engagementAttributes":[
          {
             "type": "error",
             "error": {
               "contextId": "Credit card application",
               "message": "test1",
               "code": "1",
               "level": 10,
               "resolved": false
             }
           }
   ]
 }
};

getVid(url,options)

function getVid(url, options){
  console.log('-----Getting vid--------');
  axios.put(url, options)
    .then((response)=>{
      console.log(`Response status code = ${response.status}`);
      console.log(`Response status code = ${response.statusText}`);
      console.log(`Response data = ${JSON.stringify(response.data)}`);
        if(response.status === 202){
          let split = response.data.message.split(" ");
          // console.log(split);
          console.log(`vid = ${split[4]}`);
          url = "https://va.v.liveperson.net/api/account/75070123/app/b63fa9ce-28a5-452a-80a2-b0e0d043ee37/report?v=1.1&obh=true&vid="+split[4];

          setTimeout(function(){
          getSid(url,options);
          }, 2000);

        }
      })
      .catch((error)=>{
        // console.log(error);
        console.log(`Error status: ${error.response.status}`);
        console.log(`Error status: ${error.response.statusText}`);
        console.log(`Error data: ${JSON.stringify(error.response.data)}`);
      })
}


// GET sid
function getSid(url,options){
  // url = "https://va.v.liveperson.net/api/account/75070123/app/b63fa9ce-28a5-452a-80a2-b0e0d043ee37/report?v=1.1&vid=M5NDRiMDViZWY3NDc0NzNh";
  console.log('-----Getting sid--------');
  console.log(url);
  console.log(JSON.stringify(options));
  axios.put(url,options)
    .then((response)=>{
      console.log(`Response status code = ${response.status}`);
      console.log(`Response status code = ${response.statusText}`);
      console.log(`Response data = ${JSON.stringify(response.data)}`);
    })
    .catch((error)=>{
      // console.log(error);
      console.log(`Error status: ${error.response.status}`);
      console.log(`Error status: ${error.response.statusText}`);
      console.log(`Error data: ${JSON.stringify(error.response.data)}`);

    })

}
