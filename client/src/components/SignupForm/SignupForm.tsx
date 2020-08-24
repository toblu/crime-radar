import React from 'react';
import { useMutation } from '@apollo/client';
import {useLocation, useHistory} from 'react-router-dom';
import AuthForm from '../auth/AuthForm';
import { SignupFormComponent } from './SignupForm.types';
import SIGNUP from '../../graphql/mutations/signup';
import CURRENT_USER from '../../graphql/queries/currentUser';
import { useAuth } from '../auth/shared/hooks';

const SignupForm: SignupFormComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const redirectUrl = location.state?.fromUrl ?? '/profile';

  const {auth} = useAuth();

  React.useEffect(() => {
    if (auth?.user) {
      history.push(redirectUrl)
    }
  }, [auth?.user])

  const [signup, { error }] = useMutation(SIGNUP, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const errors = error?.graphQLErrors.map(error => error.message) ?? []

  function onSignup({email, password}: {email: string, password: string}) {
    console.log("Signup");
    console.log({email, password});
    signup({
      variables: {
        email,
        password
      }
    })
  }

  return <div>
    <h3>Signup</h3>
      <AuthForm onSubmit={onSignup} errors={errors} validatePassword/>
    </div>
}

export default SignupForm;
