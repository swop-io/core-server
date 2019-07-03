const BlockchainHelper = require('../blockchain')
const LocalDatabase = require('../database')

class TicketManager {

    constructor(){
        this.blockchain = new BlockchainHelper()
        
        // for future use
        this.localDb = new LocalDatabase()
    }

    async sell(ticketInfo){
        let txHash = await this.blockchain.sellTicket(ticketInfo)
        return txHash
    }

    async getTicketAmount(){
        return await this.blockchain.getTicketAmount()
    }

    async getSwopRefNo(){
        return await this.blockchain.getSwopRefNo()
    }

}

module.exports = TicketManager