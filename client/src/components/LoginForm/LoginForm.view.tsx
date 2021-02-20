import React from 'react';
import { Typography } from '@material-ui/core';
import { AuthForm } from '../shared';
import { LoginFormViewComponent } from './LoginForm.types';

export const LoginFormView: LoginFormViewComponent = ({ onSubmit, errors }) => (
    <div>
        <Typography variant="h4">Login</Typography>
        <AuthForm
            onSubmit={onSubmit}
            errors={errors}
            validatePassword={false}
        />
    </div>
);
