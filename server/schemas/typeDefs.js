// this file will contain the typeDefinitons for the GraphQL API

const gql = require('graphql-tag');

const typeDefs = gql`
  ### Defined the User type
  type User {
    _id: ID
    username: String!
    email: String!
    favourCryptos: [FavourCrypto]
  }

  type FavourCrypto {
    _id: ID
    name: String!
    image: String!
  }

  input cryptoInput {
    name: String!
    image: String!
  }

  ## Defined the Auth type to validate the user
  type Auth {
    token: ID!
    user: User
  }

  ## defineing the nescessary queries to be made
  type Query {
    me: User
  }

  type Mutation {
    SaveCrypto(cryptoInput: cryptoInput!): User
  }
`;

module.exports = typeDefs;
