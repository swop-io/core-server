const ethers = require('ethers')
const abi = require('./SwopTester.json')
const contractAddress = '0x583b9652097F65F4Fde506DE4a3b6bC10e5fddF4'

class BlockchainHelper {
    constructor(){
        this.provider = ethers.getDefaultProvider('ropsten')
        this.wallet = new ethers.Wallet(process.env.ROPSTEN_ACCOUNT1_PK, this.provider)
        this.contract = new ethers.Contract(contractAddress, abi, this.provider).connect(this.wallet)
        this.startListener()
    }

    async sellTicket(ticketInfo){
        let tx = await this.contract.sellTicket(ticketInfo.swopRefNo,ticketInfo.amount)
        return tx.hash
    }

    async getTicketAmount(){
        let amount = await this.contract.getTicketAmount()
        return amount.toNumber().toString()
    }

    async getSwopRefNo(){
        let swopRefNo = await this.contract.getSwopRefNo()
        return swopRefNo
    }

    async startListener(){
        this.contract.on("SellTicket", (seller, swopRefNo, amount) => {
            console.log('seller: ', seller)
            console.log('swopRefNo: ', swopRefNo)
            console.log('amount: ', amount.toNumber())
        })
    }
}

module.exports = BlockchainHelper