import React from 'react';
import { useMutation } from '@apollo/client';
import {useLocation, useHistory} from 'react-router-dom';
import AuthForm from '../auth/AuthForm';
import { LoginFormComponent } from './LoginForm.types';
import LOGIN from '../../graphql/mutations/login';
import CURRENT_USER from '../../graphql/queries/currentUser';
import { useAuth } from '../auth/shared/hooks';
import { LocationState } from '../auth/shared/types/auth.types';

const LoginForm: LoginFormComponent = () => {
  const location = useLocation<LocationState>();
  const history = useHistory<LocationState>();
  const redirectUrl = location.state?.fromUrl ?? '/';

  const {auth} = useAuth();

  React.useEffect(() => {
    if (auth?.user) {
      history.push(redirectUrl)
    }
  }, [auth?.user])

  const [login, { error }] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const errors = error?.graphQLErrors.map(error => error.message) ?? []

  function onLogin({email, password}: {email: string, password: string}) {
    console.log("Login");
    console.log({email, password});
    login({
      variables: {
        email,
        password
      }
    })
  }

  return <div>
    <h3>Login</h3>
      <AuthForm onSubmit={onLogin} errors={errors}/>
    </div>
}

export default LoginForm;
