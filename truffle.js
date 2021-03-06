require("babel-register");
require("babel-polyfill");
var HDWalletProvider = require("truffle-hdwallet-provider");

process.env.NODE_CONFIG_DIR = "./config"
const config = require("config")

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 1
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
    //   gas: 800000000,
      gasPrice: 1,
      network_id: "*"
    },
    ropsten: {
      provider: new HDWalletProvider(
        config.get('passphrase'),
        "https://ropsten.infura.io/"
      ),
      network_id: "3",
      gas: 7990000,
      gasPrice: 22000000000
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 9328,
      gas: 10000000000000,
      gasPrice: 0x01
    },
    rinkeby: {
      provider: new HDWalletProvider(
        config.get('passphrase'),
        "https://rinkeby.infura.io/"
      ),
      network_id: "4",
      gas: 7200000,
      gasPrice: 22000000000
    },
    production: {
      provider: new HDWalletProvider(
        config.get('passphrase'),
        "https://mainnet.infura.io/"
      ),
      network_id: "1",
      gas: 7990000,
      gasPrice: 6000000000
    }
  }
};
