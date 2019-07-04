const ethers = require('ethers')
const abi = require('./SwopTester.json')
const contractAddress = '0x583b9652097F65F4Fde506DE4a3b6bC10e5fddF4'

class BlockchainClient {

    constructor(firebaseDB){
        this.firebaseDB = firebaseDB
        this.provider = ethers.getDefaultProvider('ropsten')
        this.wallet = new ethers.Wallet(process.env.ROPSTEN_ACCOUNT1_PK, this.provider)
        this.contract = new ethers.Contract(contractAddress, abi, this.provider).connect(this.wallet)
        this.startListener()
    }

    async completeTransaction(swopRefNo){

    }

    async startListener(){
        this.contract.on("SellTicket", (seller, swopRefNo, amount) => {
            // update ticket status
            // this.firebaseDB.updateTicketStatus(swopRefNo)
        })
    }
}

module.exports = BlockchainClient