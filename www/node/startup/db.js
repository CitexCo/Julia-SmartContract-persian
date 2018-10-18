const mongoose = require("mongoose");
const winston = require("winston");

module.exports = async function() {
  const db = "mongodb://localhost:27017/citex";
  await mongoose.connect(
    db,
    { useNewUrlParser: true }
  );
  winston.debug("connected to db");
};
