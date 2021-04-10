import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
import { Header } from './components/Header';
import { Routes } from './components/Routes';
import './App.css';

const link = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER
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
