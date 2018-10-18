const mongoose = require('mongoose')

const tokenValues = new mongoose.Schema({
    to: { type: String, required: true },
    from: { type: String, required: true },
    value: { type: Number, required: true }
})

const tokenSchema = new mongoose.Schema({
    timestamp: { type: String },
    transactionHash: { type: String, required: true },
    blockNumber: { type: String, required: true },
    address: { type: String, required: true },
    event: { type: String, required: true },
    returnValues: { type: tokenValues, required: true }
})

const Token = mongoose.model('token', tokenSchema)

module.exports = Token