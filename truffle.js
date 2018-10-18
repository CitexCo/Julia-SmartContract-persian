require("babel-register");
require("babel-polyfill");
// ganache-cli --mnemonic "copy obey episode awake damp vacant protect hold wish primary travel shy" --verbose --networkId=3 --gasLimit=80000000000 --gasPrice=2000

var HDWalletProvider = require("truffle-hdwallet-provider");

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
      gasPrice: 1, // Specified in Wei
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(
        "neglect river keep provide spoon trick over dolphin whale heavy pizza office",
        "https://ropsten.infura.io/"
      ),
      network_id: "3",
      gas: 7990000,
      gasPrice: 22000000000 // Specified in Wei
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
        "neglect river keep provide spoon trick over dolphin whale heavy pizza office",
        "https://rinkeby.infura.io/"
      ),
      network_id: "4",
      gas: 7200000,
      gasPrice: 22000000000 // Specified in Wei
    },
    // production: {
    //   provider: new HDWalletProvider(
    //     "",
    //     "https://mainnet.infura.io/"
    //   ),
    //   network_id: "1",
    //   gas: 7990000,
    //   gasPrice: 6000000000
    // }
  }
};
