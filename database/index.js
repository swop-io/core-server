const admin = require("firebase-admin");
const serviceAccount = require("../swopServiceAccountKey.json");

const PATH_FLIGHT_INFO = '/fligthInfo'
const PATH_AUCTIONS = '/auctions'
const PATH_BIDS = '/bids'
const PATH_TICKETS = '/tickets'
const TICKET_STATUS = { PENDING : 'PENDING', 
                        IN_PROGRESS : 'IN_PROGRESS', 
                        COMPLETED : 'COMPLETED' }

class FirebaseClient {

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://swop-mvp.firebaseio.com"
        });

        this.database = admin.database()
        this.flightRef = this.database.ref(PATH_FLIGHT_INFO)
        this.auctionRef = this.database.ref(PATH_AUCTIONS)

    }

    saveTicket(payload){
        let ticketRef = this.database.ref(`${PATH_TICKETS}/${payload.swopRefNo}`)
        ticketRef.set({
            amount : payload.amount,
            airline : payload.airline,
            depart : payload.depart,
            return : payload.return,
            status : TICKET_STATUS.PENDING
        }) 

        let auctionRef = this.auctionRef.child(payload.swopRefNo)
        auctionRef.set({
            lowestAskAmount : payload.lowestAskAmount,
            maxAskAmount : payload.amount,
            highestBidAmount : 0,
            currentNonce : 0
        })
    }

    async retrieveTicket(swopRefNo){
        let ticketRef = this.database.ref(`${PATH_TICKETS}/${swopRefNo}`)
        let result = await ticketRef.once('value')
        return result.val()
    }

    saveBid(payload){
        let auctionRef = this.auctionRef.child(payload.swopRefNo)
        let bidRef = this.database.ref(`${PATH_BIDS}/${payload.swopRefNo}`)

        auctionRef.once("value", function(snapshot) {
      
            let auctionDetails = snapshot.val()

            if(auctionDetails === null) {
                console.log('creating new auction')
                auctionRef.set({
                    lowestAskAmount : payload.lowestAskAmount,
                    maxAskAmount : payload.maxAskAmount,
                    highestBidAmount : 0,
                    currentNonce : 0

                })
              
                bidRef.set({
                        0 : {
                            amount : payload.bidAmount,
                            user : payload.user,
                            datetime : 'datetimehere',
                            signature : {
                                r : payload.signature.r,
                                s : payload.signature.s,
                                v : payload.signature.v

                            }
                        }
                })
            } else {
                console.log('adding new bid')
                let newNonce = auctionDetails.currentNonce + 1
                
                bidRef.child(newNonce).set({
                        amount : payload.bidAmount,
                        user : payload.user,
                        datetime : 'datetimehere',
                        signature : {
                            r : payload.signature.r,
                            s : payload.signature.s,
                            v : payload.signature.v

                        }
                })
         
                auctionRef.update({
                    currentNonce : newNonce,
                    highestBidAmount : payload.bidAmount
                })
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
    }



    async updateTicketStatus(swopRefNo){
        console.log('update ticket status: ' + swopRefNo)
    }

    async retrieveListByParam(param){

    }

    async retrieveAllListing(){
       let results = await this.flightRef.once('value')
       let response = results.val()
       return response
    }

    async getTicketStatus(swopRefNo){
        
    }
}

module.exports = FirebaseClient