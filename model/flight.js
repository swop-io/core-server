
class Flight {

    constructor(
        swopRefNo, 
        amount,
        airline,
        airportCode,
        arrival,
        departure)
    {
        this.swopRefNo = swopRefNo
        this.amount = amount
        this.airline = airline
        this.airportCode = airportCode
        this.arrivalDateTime = arrival
        this.departureDateTime = departure
    }
}

module.exports = Flight