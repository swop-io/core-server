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

    }

    async checkTicketStatus(swopRefNo){

    }

    verifyTicket(bookingRefNo){
        let response = this.partner.verifyTicket(bookingRefNo)

        // save ticket details to DB
        return response
    }

}

module.exports = TicketManager