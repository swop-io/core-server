const express = require('express')
const bodyParser = require('body-parser');
const TicketManager = require('./ticket_manager')
const app = express()
const port = 3000

const ticketManager = new TicketManager()

app.use(bodyParser.json());



app.get('/checkTicketStatus', (req, res) => {

})

app.get('/search', (req, res) => {

})


app.post('/verifyTicket', (req, res) => {
    let response = ticketManager.verifyTicket(req.body.bookingRefNo)
    console.log(response)
    res.send(response)
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))