const Web3 = require('web3')  
const abi = require('./src/abis/Axe.json')

const web3 = new Web3(new Web3.providers.HttpProvider('https://pulsechain-testnet.publicnode.com'))

const contract = new web3.eth.Contract(abi.abi,"0xEB9c73F54e1eAcaa504ca888f2f6f4a4caa2640E")

contract.methods.balanceOf("0x773D1360466e4E5a0287fFAAcb57614Ac6F4F597").call().then((balance) => {
    console.log(balance)
})