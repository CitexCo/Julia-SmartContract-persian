const Web3 = require("web3");
const winston = require("winston");

// const providerUrl = 'ws://localhost:8545'
// const providerUrl = 'ws://localhost:8546'


// const providerUrl = "http://88.198.19.89:8545";
// const providerUrl = "ws://88.198.19.89:8546";


// const providerUrl = "wss://ropsten.infura.io/ws";
// const providerUrl = "wss://mainnet.infura.io/ws/951c2c9250c841d8a25b21859b6b8a46";
// const providerUrl = "https://ropsten.infura.io/v3/951c2c9250c841d8a25b21859b6b8a46"

var w3 = function w3() {
    var _this = this;
    var self = this;

    var providerUrl = "https://ropsten.infura.io/v3/951c2c9250c841d8a25b21859b6b8a46"

    this.web3 = new Web3();

    var isConnected = this.isConnected;
    this.isConnected = async function () {
        self.web3.setProvider(new Web3.providers.HttpProvider(providerUrl))
        const result = await self.web3.eth.net.isListening()
        return result
    }

    var getNetworkId = this.getNetworkId;
    this.getNetworkId = async function () {
        const networkId = await web3.eth.net.getId()
        return networkId
    }

}

module.exports = w3
