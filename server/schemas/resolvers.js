// this file will be used to define the queries and mutations for the server using the typeDefs blueprint
require('dotenv').config();

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
      }
    },
  },

  // this will allow the user to preform CRUDE operations
  Mutation: {
    createUser(parent, { username, email, password }) {
      try {
        // creating a new user with the provided args
        const user = User.create({ username, email, password });

        if (!user) {
          throw new Error('cannot create a new user');
        }

        // assigning the user a new JWT for authentication
        const token = signToken(user);

        // returning the newly created user and JWT
        return { user, token };
      } catch (err) {
        // logging any error in the process
        console.error(err);
        throw new Error('cannot create a new user');
      }
    },
  },
};

module.exports = resolvers;
