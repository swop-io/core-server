const express = require('express')
const bodyParser = require('body-parser');
const TicketManager = require('./ticket_manager')
const app = express()
const port = 3000

const ticketManager = new TicketManager()

app.use(bodyParser.json());

app.get('/getTicketAmount', (req, res) => {
    ticketManager.getTicketAmount().then((amount) => {
        console.log(amount)
        res.send(amount)
    }).catch(err => {
        res.send(err)
    })
})

app.get('/getSwopRefNo', (req, res) => {
    ticketManager.getSwopRefNo().then((swopRefNo) => {
        console.log(swopRefNo)
        res.send(swopRefNo)
    }).catch(err => {
        res.send(err)
    })
})

app.post('/sellTicket', (req, res) => {
    ticketManager.sell(req.body).then((txHash) => {
        console.log(txHash)
        res.send(txHash)
    }).catch(err => {
        res.send(err)
    })
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))