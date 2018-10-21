const fs = require('fs')
const path = require('path')
const w3 = require('../network/web3')

const tokenPath = '../../../build/contracts/citexToken.json';

// async function getNetworkId() {
//     const networkId = await web3.eth.net.getId()
//     return networkId
// }

var CitexToken = function CitexToken() {
    this.web3 = new w3()

    var instantiate = this.instantiate;
    this.instantiate = function instantiate() {
        return new Promise((resolve, reject) => {
            try {
                this.web3.getNetworkId().then(id => {
                    const address = tokenABI.networks[id].address
                    const CitexToken = new web3.eth.Contract(abi, address)
                    resolve(CitexToken)
                })
            } catch(ex) {
                reject(ex)
            }
        })
    }

    var owner = this.owner;
    this.owner = function owner() {
        const citexToken = await this.instantiate()
        const owner = await citexToken.methods.owner().call()
        return owner()
    }

    function getABI() {
        const tokenABI = JSON.parse(fs.readFileSync(path.join(__dirname, tokenPath)))
        return tokenABI.abi
    }
}

module.exports = CitexToken