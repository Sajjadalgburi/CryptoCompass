// this file is used to connect to the database
require("dotenv").config();
const { connection, connect } = require("mongoose");

connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/CryptoCurrencyDb"
);

module.exports = connection;
