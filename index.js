const express = require('express')
const bodyParser = require('body-parser');
const TicketManager = require('./ticket_manager')
const url = require('url')
const app = express()
const port = 3000
const ticketManager = new TicketManager()
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/test', (req, res) => {
    res.send('Server is running!')
})

app.get('/checkTicketStatus', (req, res) => {

})

app.get('/search', async (req, res) => {
    let parts = url.parse(req.url, true)
    let query = parts.query

    let response = await ticketManager.search('')
    console.log(response)
    res.send(response)
})


app.post('/verifyTicket', (req, res) => {
    let response = ticketManager.verifyTicket(req.body.bookingRefNo)
    console.log(response)
    res.send(response)
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))