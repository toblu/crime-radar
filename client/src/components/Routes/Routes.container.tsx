import React from 'react';
import { Route } from 'react-router-dom';
import { EventsPage } from '../EventsPage';
import { LoginForm } from '../LoginForm';
import { SignupForm } from '../SignupForm';
import { PrivateRoute } from './components';
import { RoutesView } from './Routes.view';

export const RoutesContainer = () => (
    <RoutesView>
        <Route path="/" exact>
            <EventsPage />
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
    </RoutesView>
);
