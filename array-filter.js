
var sdesdata = [{
  "events": [
    {
      "personalInfo": {
        "serverTimeStamp": 1596848636878,
        "originalTimeStamp": 1596846102796,
        "personalInfo": {
          "contacts": []
        }
      },
      "serverTimeStamp": 1596848636878,
      "sdeType": "PERSONAL_INFO"
    },
    {
      "lead": {
        "lead": {
          "topic": "https://myvpostpay.verizonwireless.com/ui/hub/secure/overview?flow=1D#/",
          "value": -1,
          "leadId": "Page View",
          "currency": null
        },
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827905662
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "LEAD"
    },
    {
      "personalInfo": {
        "serverTimeStamp": 1596850435058,
        "originalTimeStamp": 1596846687209,
        "personalInfo": {
          "name": "Suarez",
          "surname": " Gabriella",
          "contacts": []
        }
      },
      "serverTimeStamp": 1596850435058,
      "sdeType": "PERSONAL_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841163373,
        "originalTimeStamp": 1596838650702,
        "customerInfo": {
          "customerId": "ec1c9d3c-9072-4758-9c9d-3c90723758b7"
        }
      },
      "serverTimeStamp": 1596841163373,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827249779,
        "customerInfo": {
          "customerId": "suarga9"
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596857576511,
        "originalTimeStamp": 1596854676178,
        "customerInfo": {
          "customerId": "suarga9",
          "companyBranch": "Aiea"
        }
      },
      "serverTimeStamp": 1596857576511,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "personalInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596833229730,
        "personalInfo": {
          "name": "Suarez",
          "surname": " Gabriella",
          "contacts": []
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "PERSONAL_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596838049520,
        "customerInfo": {
          "customerId": "ec1c9d3c-9072-4758-9c9d-3c90723758b7"
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596850435057,
        "originalTimeStamp": 1596846687209,
        "customerInfo": {
          "customerId": "suarga9",
          "companyBranch": "Aiea"
        }
      },
      "serverTimeStamp": 1596850435057,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596833229734,
        "customerInfo": {
          "customerId": "suarga9",
          "companyBranch": "Aiea"
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596848636878,
        "originalTimeStamp": 1596846102797,
        "customerInfo": {
          "customerId": "suarga9"
        }
      },
      "serverTimeStamp": 1596848636878,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "personalInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827249779,
        "personalInfo": {
          "contacts": []
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "PERSONAL_INFO"
    },
    {
      "lead": {
        "lead": {
          "topic": "https://myvpostpay.verizonwireless.com/ui/hub/secure/overview?flow=1D#/",
          "value": -1,
          "leadId": "Page View",
          "currency": null
        },
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827775241
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "LEAD"
    },
    {
      "personalInfo": {
        "serverTimeStamp": 1596857576511,
        "originalTimeStamp": 1596854676178,
        "personalInfo": {
          "name": "Suarez",
          "surname": " Gabriella",
          "contacts": []
        }
      },
      "serverTimeStamp": 1596857576511,
      "sdeType": "PERSONAL_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827905658,
        "customerInfo": {
          "customerType": "b2e"
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "CUSTOMER_INFO"
    },
    {
      "customerInfo": {
        "serverTimeStamp": 1596841624367,
        "originalTimeStamp": 1596827775235,
        "customerInfo": {
          "customerType": "b2e"
        }
      },
      "serverTimeStamp": 1596841624367,
      "sdeType": "CUSTOMER_INFO"
    }
  ]
}]


var index = 0;
var filteredData = sdesdata.filter((d) => {
  // console.log(d.events);
  const events = d.events;
  events.filter((e)=>{
    // console.log(e);


    const startTime = 1596838052186;
    const endTime = 1596838741446;
    // startTime = moment.format('yy-mm-dd HH:mm:ss');
    console.log(startTime);
    if (e.serverTimeStamp >= startTime && e.serverTimeStamp <= endTime){
      index += 1;
      console.log(e);
      if (e.personalInfo)
        console.log(JSON.stringify(e.personalInfo))
      if (e.customerInfo)
        console.log(JSON.stringify(e.customerInfo))
      // if (e.lead)
      //   console.log(JSON.stringify(e.lead))
    }
  })
});
console.log(index)
// console.log(filteredData);
