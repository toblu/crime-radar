import { Typography } from '@material-ui/core';
import React from 'react';
import { AuthForm } from '../shared';
import { SignupFormViewComponent } from './SignupForm.types';

export const SignupFormView: SignupFormViewComponent = ({
    onSignup,
    errors
}) => (
    <div>
        <Typography variant="h4">Sign up</Typography>
        <AuthForm onSubmit={onSignup} errors={errors} validatePassword />
    </div>
);
