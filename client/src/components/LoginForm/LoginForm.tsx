import React from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';
import AuthForm from '../auth/AuthForm';
import { LoginFormComponent } from './LoginForm.types';
import LOGIN from '../../graphql/mutations/login';
import CURRENT_USER from '../../graphql/queries/currentUser';
import { useAuth } from '../auth/shared/hooks';
import { AuthRedirectLocationState } from '../auth/shared/types/auth.types';

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
      <h3>Login</h3>
      <AuthForm onSubmit={onLogin} errors={errors} />
    </div>
  );
};

export default LoginForm;
