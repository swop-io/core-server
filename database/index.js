const admin = require("firebase-admin");
const serviceAccount = require("../swopServiceAccountKey.json");

const PATH_FLIGHT_INFO = '/fligthInfo'
const PATH_AUCTIONS = '/auctions'
const PATH_BIDS = '/bids'
const PATH_TICKETS = '/tickets'
const PATH_LISTINGS = '/listings'
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
        this.listingRef = this.database.ref(PATH_LISTINGS)

    }

    saveTicket(payload){
        let ticketRef = this.database.ref(`${PATH_TICKETS}/${payload.swopRefNo}`)
        ticketRef.set({
            amount : payload.amount,
            airline : payload.airline,
            depart : payload.depart,
            return : payload.return,
            status : TICKET_STATUS.PENDING,
            createdAt : new Date().getTime()
        }) 

        let auctionRef = this.auctionRef.child(payload.swopRefNo)
        auctionRef.set({
            lowestAskAmount : payload.lowestAskAmount,
            maxAskAmount : payload.amount,
            highestBidAmount : 0,
            currentNonce : 0
        })

        let listingRef = this.database.ref(`${PATH_LISTINGS}/${payload.user}/${payload.swopRefNo}`)
        listingRef.set({ status : 'ACTIVE'})
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
            let date = new Date()
            let dateStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
            let auctionDetails = snapshot.val()

            if(auctionDetails === null) {
                console.log('creating new auction')
                auctionRef.set({
                    highestBidAmount : payload.bidAmount,
                    currentNonce : 0,
                    currentSignature :  {
                        r : payload.signature.r,
                        s : payload.signature.s,
                        v : payload.signature.v

                    }
                })
              

             
                bidRef.set({
                        0 : {
                            amount : payload.bidAmount,
                            user : payload.user,
                            datetime : dateStr,
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
                        datetime : dateStr,
                        signature : {
                            r : payload.signature.r,
                            s : payload.signature.s,
                            v : payload.signature.v

                        }
                })
         
                auctionRef.update({
                    currentNonce : newNonce,
                    highestBidAmount : payload.bidAmount,
                    currentSignature :  {
                        r : payload.signature.r,
                        s : payload.signature.s,
                        v : payload.signature.v

                    }
                })
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
    }
}

module.exports = FirebaseClient