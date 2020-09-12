import React from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';
import AuthForm from '../auth/AuthForm';
import { LoginFormComponent } from './LoginForm.types';
import LOGIN from '../../graphql/mutations/login';
import CURRENT_USER from '../../graphql/queries/currentUser';
import { useAuth } from '../auth/shared/hooks';
import { AuthRedirectLocationState } from '../auth/shared/types/auth.types';
import { Typography } from '@material-ui/core';

const LoginForm: LoginFormComponent = () => {
  const location = useLocation<AuthRedirectLocationState>();
  const history = useHistory<AuthRedirectLocationState>();
  const redirectUrl = location.state?.fromUrl ?? '/';

  const { auth } = useAuth();

  React.useEffect(() => {
    if (auth?.user) {
      history.push(redirectUrl);
    }
  }, [auth, history, redirectUrl]);

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
    console.log('Login');
    console.log({ email, password });
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

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <AuthForm onSubmit={onLogin} errors={errors} validatePassword={false} />
    </div>
  );
};

export default LoginForm;
