import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';

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
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/">
            Hello world
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <PrivateRoute path="/profile" fallbackRoute="/">
            <div>Profile page</div>
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
