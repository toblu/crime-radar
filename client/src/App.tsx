import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { Header } from './components/Header';
import { Routes } from './components/Routes';

const link = createHttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id as string
  }),
  link
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
