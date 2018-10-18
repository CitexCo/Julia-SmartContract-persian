const Web3 = require("web3");
const winston = require("winston");

// const providerUrl = 'ws://localhost:8545'
const providerUrl = "http://88.198.19.89:8545";
// const providerUrl = "wss://ropsten.infura.io/ws";
// const providerUrl = "wss://mainnet.infura.io/ws/951c2c9250c841d8a25b21859b6b8a46";

const web3 = new Web3();

web3.setProvider(new Web3.providers.HttpProvider(providerUrl));
web3.eth.net
  .isListening()
  .then(() => winston.debug("Web3 connection established"))
  .catch(e => winston.error(e));

module.exports = web3;
