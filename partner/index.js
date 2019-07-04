const crypto = require("crypto");
const mock = require("../mock/sample_flight_details.json")

/**
 * @notice API Simulator for Airline Partners
 * @description It should act as an HTTP Client for Airline Partner API
 */
class PartnerClient {

    constructor(){
        this.map = new Map
        this.generateTestBookings()
    }

    verifyTicket(bookingRefNo){
        // booking does not exist
        if(!this.map.has(bookingRefNo)) return { msg : 'Booking does not exist', code : 404 }
        
        let randomIndex = Math.floor((Math.random() * mock.length))
        let response = mock[randomIndex]

        // assign generated swopRefNo to specific bookingRefNo
        response['swopRefNo'] = this.map.get(bookingRefNo)
        
        return { code : 200, data : response }
    }

    updateTicket(swopRefNo){
        // transfers the ticket to the new owner
        // assuming that all updates were succesful
        return true
    }

    generateTestBookings(){
        console.log('==== TEST BOOKING REFERENCE NUMBERS ====')

        for(let i = 0; i < 20; i++){
            let swopRefNo = this.generateSwopRefNo()
            let bookingRefNo = this.generateBookingRefNo()
            this.map.set(bookingRefNo, swopRefNo)
            console.log(bookingRefNo)
        }

        console.log('================= END ==================')
    }

    generateSwopRefNo(){
        return `SWP#${crypto.randomBytes(4).toString("hex")}`
    }

    generateBookingRefNo(){
        return `BKN#${crypto.randomBytes(4).toString("hex")}`
    }
}

module.exports = PartnerClient