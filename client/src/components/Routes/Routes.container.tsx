import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AboutPage } from '../AboutPage';
import { EventsPage } from '../EventsPage';
import { LoginForm } from '../LoginForm';
import { SignupForm } from '../SignupForm';
import { PrivateRoute } from './components';
import { RoutesView } from './Routes.view';

export const RoutesContainer = () => (
    <RoutesView>
        <Switch>
            <Route path="/login">
                <LoginForm />
            </Route>
            <Route path="/signup">
                <SignupForm />
            </Route>
            <Route path="/about">
                <AboutPage />
            </Route>
            <PrivateRoute path="/profile" fallbackRoute="/">
                <div>Profile page</div>
            </PrivateRoute>
            <Route path="/">
                <EventsPage />
            </Route>
        </Switch>
    </RoutesView>
);
