// this file will be used to define the queries and mutations for the server using the typeDefs blueprint
require('dotenv').config();

// importing the User model
const { User } = require('../models');

const resolvers = {
  // this is read only data to retrieve data from the server
  Query: {
    // this will return the users data
    me(__, args, context) {
      try {
        if (context.user) {
          // find the ID of the user that is logged in
          return User.findById(context.user._id);
        }

        throw new Error('Cannot find the user with this id!');
      } catch (err) {
        console.error(err);
      }
    },
  },

  // this will allow the user to prefrom CRUDE operations
  Mutation: {},
};

module.exports = resolvers;
