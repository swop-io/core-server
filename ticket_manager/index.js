const BlockchainClient = require('../blockchain')
const FirebaseClient = require('../database')
const PartnerClient = require('../partner')

class TicketManager {

    constructor(){
        this.firebaseDB = new FirebaseClient()
        this.blockchain = new BlockchainClient(this.firebaseDB)
        this.partner = new PartnerClient()
    }
    
    async search(param){
        return await this.firebaseDB.retrieveAllListing()
        // if(param.isEmpty()){
        //     return this.firebaseDB.retrieveAllListing()
        // } 

        // return this.firebaseDB.retrieveListByParam(param)
    }

    async checkTicketStatus(swopRefNo){

    }

    verifyTicket(bookingRefNo){
        let response = this.partner.verifyTicket(bookingRefNo)

        if(response.code === 200){
            // TODO run on separate thread
            this.firebaseDB.saveFlightDetails(response.data)
        }

        return response
    }

    retrieveTestBookings(){
        return this.partner.retrieveTestBookings()
    }

}

module.exports = TicketManager