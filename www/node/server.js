const winston = require("winston");
const express = require("express");
const app = express();
const path = require("path");

process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

require("./startup/logging.js")();
require("./startup/config.js")();
require("./startup/db.js")();
let server = require("./startup/server")(app);

const w3 = require("./network/web3")
const web3 = new w3()
web3.isConnected()

// require("./events/token").syncPastEvents();

app.use(express.static(path.join(__dirname, "../dist/transfer")));

server.listen(app.get("port"), app.get("host"), () => {
  winston.debug(
    `Server is connected to port ${app.get("host")}:${app.get("port")}`
  );
});
