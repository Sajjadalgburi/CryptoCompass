// Import required packages
const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

// Import custom modules
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

// Function to start the Apollo Server
const startApolloServer = async () => {
  try {
    await server.start();

    // Apply middleware for body parsing and GraphQL endpoint
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: authMiddleware,
      }),
    );

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // Start the server once the database connection is open
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
      });
    });
  } catch (error) {
    console.error('Error starting Apollo Server:', error);
  }
};

// Start the Apollo Server
startApolloServer();
