// This file will hold the FavourCrypto schema. This schema will be used to store the user's favourite cryptocurrencies

const { Schema } = require('mongoose');

// the blueprint for the saved cryptocurrencies which will include the name and image of the cryptocurrency
const favourCryptoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = favourCryptoSchema;
