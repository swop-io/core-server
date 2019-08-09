const FirebaseClient = require('./database')

let client = new FirebaseClient()

// client.saveFlightDetails('')

let payload = {
    swopRefNo : "11000"
}
client.saveBid(payload)