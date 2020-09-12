import React from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';
import AuthForm from '../auth/AuthForm';
import { SignupFormComponent } from './SignupForm.types';
import SIGNUP from '../../graphql/mutations/signup';
import CURRENT_USER from '../../graphql/queries/currentUser';
import { useAuth } from '../auth/shared/hooks';
import { AuthRedirectLocationState } from '../auth/shared/types/auth.types';
import { Typography } from '@material-ui/core';

const SignupForm: SignupFormComponent = () => {
  const location = useLocation<AuthRedirectLocationState>();
  const history = useHistory<AuthRedirectLocationState>();
  const redirectUrl = location.state?.fromUrl ?? '/profile';

  const { auth } = useAuth();

  React.useEffect(() => {
    if (auth?.user) {
      history.push(redirectUrl);
    }
  }, [auth, history, redirectUrl]);

  const [signup, { error }] = useMutation(SIGNUP, {
    refetchQueries: [{ query: CURRENT_USER }]
  });

  const errors = error?.graphQLErrors.map((error) => error.message) ?? [];

  async function onSignup({
    email,
    password
  }: {
    email: string;
    password: string;
  }) {
    console.log('Signup');
    console.log({ email, password });
    try {
      await signup({
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
      <Typography variant="h4">Sign up</Typography>
      <AuthForm onSubmit={onSignup} errors={errors} validatePassword />
    </div>
  );
};

export default SignupForm;
