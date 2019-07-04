const TicketManager = require('./ticket_manager')
const PartnerClient = require('./partner')

// const ticketManger = new TicketManager()
const partnerClient = new PartnerClient()

// ticketManger.sellTicket()

partnerClient.verifyTicket('asd')