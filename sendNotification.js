const axios = require('axios');

const sendNotification = function(data){
    let url  = 'https://chat.googleapis.com/v1/spaces/AAAAZa-6dyQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=MSeJfGSwGLxwWxUHLG7y7Ivm8evpsIsmbdnWjKO_91U%3D';

    axios.post(url,{text: data})
    .then(function (response) {
      console.log(response.data.statu);
    })
    .catch(function (error) {
      console.log(error);
    });
}
module.exports = sendNotification;
