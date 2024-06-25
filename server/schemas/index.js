// Importing the schema from the schema file. This is important because modularzing is good practice

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// Export the typeDefs and resolvers
module.exports = { typeDefs, resolvers };
