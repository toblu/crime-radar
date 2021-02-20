import React from 'react';
import { useMutation } from '@apollo/client';
import { LoginFormContainerComponent } from './LoginForm.types';
import { LOGIN } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';
import { useRedirectAfterAuth } from '../shared/hooks';
import { LoginFormView } from './LoginForm.view';

export const LoginFormContainer: LoginFormContainerComponent = () => {
    useRedirectAfterAuth('/');

    const [login, { error }] = useMutation(LOGIN, {
        refetchQueries: [{ query: CURRENT_USER }]
    });

    const errors = error?.graphQLErrors.map((error) => error.message) ?? [];

    async function onLogin({
        email,
        password
    }: {
        email: string;
        password: string;
    }) {
        try {
            await login({
                variables: {
                    email,
                    password
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return <LoginFormView onSubmit={onLogin} errors={errors} />;
};
