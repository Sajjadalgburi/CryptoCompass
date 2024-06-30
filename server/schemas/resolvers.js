// this file will be used to define the queries and mutations for the server using the typeDefs blueprint
require('dotenv').config();
const axios = require('axios');

// importing the User model
const { User } = require('../models');
const { signToken } = require('../utils/auth.js');

const resolvers = {
  // this is read only data to retrieve data from the server
  Query: {
    // this will return the users data
    me(parent, args, context) {
      try {
        if (context.user) {
          // find the ID of the user that is logged in
          return User.findById(context.user._id);
        }

        throw new Error('Cannot find the user with this id!');
      } catch (err) {
        console.error(err);
        throw new Error('Cannot find the user!');
      }
    },

    cryptoData: async (parent) => {
      const url = 'https://api.livecoinwatch.com/coins/list';

      // Important headers
      const headers = {
        'content-type': 'application/json',
        'x-api-key': process.env.API_KEY,
      };

      // Specifying request data
      const data = {
        currency: 'USD',
        sort: 'rank',
        order: 'ascending',
        offset: 0,
        limit: 10,
        meta: true,
      };

      try {
        // Passing the custom URL and extra args in the post request
        const response = await axios.post(url, data, { headers });

        // Mapping through each crypto and extracting the necessary data that I need
        const cryptoData = response.data.map((crypto) => ({
          name: crypto.name,
          color: crypto.color,
          rank: crypto.rank,
          age: crypto.age,
          image: crypto.png64,
          allTimeHigh: crypto.allTimeHighUSD,
          link: crypto.links.website,
          currentPrice: crypto.rate,
          volume: crypto.volume, // in the last 24 hr
          marketCap: crypto.cap, // total bitCoin * the currentPrice
          changeInHour: crypto.delta.hour, // rate of change in the last hour
          changeInDay: crypto.delta.day, // rate of change in the last day
          changeInWeek: crypto.delta.week, // rate of change in the last week
          changeInQuarter: crypto.delta.quarter, // rate of change in the last quarter
          changeInYear: crypto.delta.year, // rate of change in the last year
        }));

        return cryptoData;
      } catch (error) {
        // Handle error
        console.error('Error fetching crypto data:', error);
        throw new Error('Error fetching crypto data');
      }
    },
  },

  // this will allow the user to preform CRUDE operations
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        // creating a new user with the provided args
        const user = await User.create({ username, email, password });

        if (!user) throw new Error('cannot create a new user');

        // assigning the user a new JWT for authentication
        const token = signToken(user);

        return { user, token };
      } catch (err) {
        // logging any error in the process
        console.error(err);
        throw new Error('cannot create a new user');
      }
    },
    login: async (parent, { username, password }) => {
      try {
        // finding the user with the given username and also running a
        // method to check if the provided password is correct
        const user = await User.findOne({ username });
        const isCorrectPassword = User.isCorrectPassword(password);

        // running if statement to throw error when 1. the user doesn't exist 2. if the pass is incorrect
        if (!user)
          throw new Error(`Cannot find the user with username: ${username}`);
        if (!isCorrectPassword) throw new Error('Password is incorrect');

        // assigning the user a new JWT for authentication

        const token = signToken(user);

        return { user, token };
      } catch (err) {
        console.error(err);
        throw new Error('failed to login!');
      }
    },
    saveCrypto: async (parent, { name, image }, context) => {
      try {
        // checking wether the user is signed in
        if (!context.user)
          throw new Error('user must be signed in to save a crypto');

        // mongoose function to find the user that is signed in
        //  and add the crypto they want to save into their user schema
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favourCrypto: { name, password } } },
          { new: true, runValidators: true },
        );

        // if the process fails then will throw an error
        if (!updateUser) throw new Error('cannot save the crypto');

        return updateUser;
      } catch (err) {
        console.error(err);
        throw new Error('Error with saving the crypto');
      }
    },
  },
};

module.exports = resolvers;
