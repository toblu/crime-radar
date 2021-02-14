import React from 'react';
import { Route } from 'react-router-dom';
import { LoginForm } from '../LoginForm';
import { SignupForm } from '../SignupForm';
import { PrivateRoute } from './components';

export const RoutesContainer = () => (
  <>
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
  </>
);
