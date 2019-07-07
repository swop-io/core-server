const ethers = require('ethers')
require('dotenv').config()
const publicEntryABI = require('./abi/PublicEntry.json')
const swopManagerABI = require('./abi/SwopManager.json')

const swopManagerAddress = '0x159F5A146CA47c9D32027D9D4E0fAD7ECdE8F3A9'
const publicEntryAddress = '0x2A8F1Ea7d561A8992b11666252DC4c13a1ab9683'

class BlockchainClient {

    constructor(firebaseDB){
        this.firebaseDB = firebaseDB
        this.provider = ethers.getDefaultProvider('ropsten')
        this.wallet = new ethers.Wallet(process.env.ROPSTEN_DEV1_PK, this.provider)
        
        this.publicEntryContract = new ethers.Contract(publicEntryAddress, publicEntryABI, this.provider).connect(this.wallet)
        this.swopManagerContract = new ethers.Contract(swopManagerAddress, swopManagerABI, this.provider).connect(this.wallet)
       
        this.startListener()
    }

    async completeTransaction(swopRefNo){

    }

    async startListener(){
        this.swopManagerContract.on("TicketPosted", (swopRefNo, amount, seller) => {
            console.log(`Ticket Posted: ${swopRefNo}`)
            // update ticket status
            this.firebaseDB.updateTicketStatus(swopRefNo)
        })
    }
}

module.exports = BlockchainClient