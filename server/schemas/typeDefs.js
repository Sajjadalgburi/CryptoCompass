const gql = require('graphql-tag');

const typeDefs = gql`
  ### Defined the User type
  type User {
    _id: ID
    username: String!
    email: String!
    favourCryptos: [FavourCrypto]
  }

  ### Defined the FavourCrypto type
  type FavourCrypto {
    _id: ID
    name: String!
    image: String!
  }

  ### Input type for crypto data
  input CryptoInput {
    name: String!
    image: String!
  }

  ### Defined the Auth type to validate the user
  type Auth {
    token: ID!
    user: User
  }

  ### Defined necessary queries
  type Query {
    me: User
  }

  ### Defined necessary mutations
  type Mutation {
    saveCrypto(cryptoInput: CryptoInput!): User
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
