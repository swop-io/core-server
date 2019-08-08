const FirebaseClient = require('./database')

let client = new FirebaseClient()

// client.saveFlightDetails('')

let payload = {
    swopRefNo : "5000"
}
client.saveBid(payload)