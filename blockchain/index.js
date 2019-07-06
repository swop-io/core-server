const ethers = require('ethers')
const publicEntryABI = require('./abi/PublicEntry.json')
const swopManagerABI = require('./abi/SwopManager.json')

const abi = require('./SwopTester.json')
const contractAddress = '0x583b9652097F65F4Fde506DE4a3b6bC10e5fddF4'

class BlockchainClient {

    constructor(firebaseDB){
        // this.firebaseDB = firebaseDB
        // this.provider = ethers.getDefaultProvider('ropsten')
        // this.wallet = new ethers.Wallet(process.env.ROPSTEN_ACCOUNT1_PK, this.provider)
        
        // this.publicEntryContract = new ethers.Contract('', publicEntryABI, this.provider).connect(this.wallet)
       
        // this.swopManagerContract = new ethers.Contract('', swopManagerABI, this.provider).connect(this.wallet)
       
        // this.startListener()
    }

    async completeTransaction(swopRefNo){

    }

    async startListener(){
        // this.contract.on("TicketPosted", (seller, swopRefNo, amount) => {
        //     // update ticket status
        //     // this.firebaseDB.updateTicketStatus(swopRefNo)
        // })
    }
}

module.exports = BlockchainClient