const admin = require("firebase-admin");
const serviceAccount = require("../swopServiceAccountKey.json");

const PATH_FLIGHT_INFO = '/fligthInfo'

class FirebaseClient {

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://swop-mvp.firebaseio.com"
          });

        this.database = admin.database()
        this.flightRef = this.database.ref(PATH_FLIGHT_INFO)
    }

    async saveFlightDetails(param){
        let newDataRef = this.flightRef.push()
        newDataRef.set({ test : "test data"})
    }

    async updateTicketStatus(swopRefNo){

    }

    async retrieveListByParam(param){

    }

    async retrieveAllListing(){

    }

    async getTicketStatus(swopRefNo){
        
    }
}

module.exports = FirebaseClient