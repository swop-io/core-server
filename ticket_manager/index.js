const BlockchainClient = require('../blockchain')
const FirebaseClient = require('../database')
const PartnerClient = require('../partner')

class TicketManager {

    constructor(){
        this.firebaseDB = new FirebaseClient()
        this.blockchain = new BlockchainClient(this.firebaseDB)
        this.partner = new PartnerClient()
    }
    
    verifyTicket(bookingRefNo){
        return this.partner.verifyTicket(bookingRefNo)
    }

    postTicket(payload){
        this.firebaseDB.saveTicket(payload)
        return { code : 200, msg : 'Success' }
    }

    retrieveTicket(swopRefNo){
        return this.firebaseDB.retrieveTicket(swopRefNo)
    }

    retrieveTestBookings(){
        return this.partner.retrieveTestBookings()
    }

    placeBid(payload){
        try{
            this.firebaseDB.saveBid(payload)
            return { msg : 'added successfully'}
        }catch(e){
            console.log(e)
            return { msg : 'failed to add'}
        }
    }

}

module.exports = TicketManager