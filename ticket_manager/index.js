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
            this.firebaseDB.saveTicket(response.data)
        }

        return response
    }

    retrieveTicket(swopRefNo){
        return this.firebaseDB.retrieveTicket(swopRefNo)
    }

    retrieveTestBookings(){
        return this.partner.retrieveTestBookings()
    }

    placeBid(payload){
        try{
            console.log('payload: ' + JSON.stringify(payload))
            this.firebaseDB.saveBid(payload)
            return { msg : 'added successfully'}
        }catch(e){
            console.log(e)
            return { msg : 'failed to add'}
        }
    }

}

module.exports = TicketManager