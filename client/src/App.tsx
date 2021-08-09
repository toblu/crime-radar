import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Crime Radar</title>
                <link rel="canonical" href="http://crimeradar.se" />
                <meta
                    name="description"
                    content="Se de senaste händelserna från Polisen i ditt område. Crime
                    Radar visar brott och andra händelser från Polisen på en
                    interaktiv karta över hela Sverige."
                />
            </Helmet>
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
