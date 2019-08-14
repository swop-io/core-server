const express = require('express')
const bodyParser = require('body-parser');
const TicketManager = require('./ticket_manager')
const url = require('url')
const app = express()
const port = 3001
const ticketManager = new TicketManager()

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/testBookings', (req, res) => {
    res.send(ticketManager.retrieveTestBookings())
})

app.get('/getTicketDetails', async (req, res) => {
    let parts = url.parse(req.url, true)
    let query = parts.query
    
    let response = await ticketManager.retrieveTicket(query.swopRefNo)
    console.log(response)
    res.send(response)
})

app.get('/search', async (req, res) => {
    let parts = url.parse(req.url, true)
    let query = parts.query

    let response = await ticketManager.search('')
    console.log(response)
    res.send(response)
})

app.post('/postTicket', (req, res) => {
    console.log('body: ' + req.body)
    let response = ticketManager.postTicket(req.body)
    console.log(response)
    res.send(response)
})

app.post('/verifyTicket', (req, res) => {
    console.log(req.body.bookingRefNo)
    let response = ticketManager.verifyTicket(req.body.bookingRefNo)
    console.log(response)
    res.send(response)
})

app.post('/placeBid', (req, res) => {
    let response = ticketManager.placeBid(req.body)
    console.log(response)
    res.send(response)
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))