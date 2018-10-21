const rp = require("request-promise");
const winston = require("winston");
const config = require("config");
const Token = require("../models/token");
const CitexToken = require("../contract/token.js");
const w3 = require("../network/web3")

// ToDo: what if an error happened during syncing !important
// ToDo: connection not open on send()

const etherscanBaseUrl = "https://api.etherscan.io"

var TokenEvents = function TokenEvents() {

    var self = this;

    var getTimestamp = this.getTimestamp;
    this.getTimestamp = async function getTimestamp(blockNumber) {
        const apiKey = config.get("etherscanAPIKey");

        var options = {
            method: "GET",
            uri: `${etherscanBaseUrl}/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${apiKey}`,
            json: true
        };

        const block = await rp(options);
        return block.result.timeStamp;
    }

    var getAllEvents = this.getAllEvents;
    this.getAllEvents = function () {
        CitexToken().then(token => {
            token.events.allEvents(
                { filter: {}, fromBlock: 0, toBlock: "latest" },
                async function (error, events) {
                    if (error) {
                        winston.error(error);
                        throw new Error(error);
                    }
                    if (events.event === "Transfer") {
                        const token = await Token.findOne({
                            transactionHash: events.transactionHash
                        });
                        if (!token) {
                            const blockNumber = events.blockNumber;
                            // const timestamp = await getTimestamp(blockNumber);

                            winston.debug(events.transactionHash);
                            const token = Token(events);
                            // token.timestamp = timestamp;
                            await token.save();
                        }
                    }
                }
            );
        });
    };

    var syncPastEvents = this.syncPastEvents;
    this.syncPastEvents = function () {
        CitexToken().then(token => {
            token.methods.owner().call().then(console.log)

            let eventIds = [];

            token.getPastEvents("Transfer", { filter: {}, fromBlock: 0, toBlock: "latest" }, async function (error, events) {
                if (error) {
                    throw new Error(error);
                }
                for (event of events) {
                    const token = await Token.findOne({
                        transactionHash: event.transactionHash
                    });
                    if (!token) {
                        winston.debug(event.transactionHash);
                        const e = await insertEvent(event);
                        eventIds.push(e._id);
                    }
                }
            });
            return eventIds;
        });
    };

    var subscribeEvents = this.subscribeEvents;
    this.subscribeEvents = function () {
        CitexToken().then(token => {
            token.events.Transfer(
                { filter: {}, fromBlaock: 0, toBlock: "latest" },
                async function (error, event) {
                    if (error) {
                        winston.error(error);
                        throw new Error(error);
                    }
                    winston.debug(event.transactionHash);
                    await insertEvent(event);
                }
            );
        });
    };

    async function insertEvent(event) {
        const blockNumber = event.blockNumber;
        const timestamp = await getTimestamp(blockNumber);

        const token = Token(event);
        token.timestamp = timestamp;
        const e = await token.save();
        return e;
    }

    async function getLastBlockChecked() { }

}


module.exports = TokenEvents;
