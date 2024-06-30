// Importing components
import HomePage from './page/HomePage';

// apollo client methods
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// custom client object
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}
