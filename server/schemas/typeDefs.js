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
  type Crypto {
    name: String!
    color: String!
    rank: Int!
    age: String!
    image: String!
    allTimeHigh: Float!
    link: String!
    currentPrice: Float!
    volume: Float!
    marketCap: Float!
    changeInHour: Float!
    changeInDay: Float!
    changeInWeek: Float!
    changeInQuarter: Float!
    changeInYear: Float!
  }

  ### Defined necessary queries
  type Query {
    me: User
    cryptoData: [Crypto]
  }

  ### Defined necessary mutations
  type Mutation {
    saveCrypto(cryptoInput: CryptoInput!): User
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
