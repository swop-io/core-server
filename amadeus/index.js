var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

amadeus.referenceData.airlines.get({
    airlineCodes : 'U2'
}).then(function(response){
  console.log(response.data[0].href);
}).catch(function(responseError){
  console.log(responseError.code);
});