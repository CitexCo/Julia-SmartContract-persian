const config = require('config')
const winston = require('winston')
const path = require('path')

module.exports = async function () {
    

    if (!config.get('etherscanAPIKey')) {
        throw new Error('FATAL ERROR: etherscanAPIKey is not defined')
    }
}