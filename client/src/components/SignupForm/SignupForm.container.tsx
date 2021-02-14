import React from 'react';
import { useMutation } from '@apollo/client';
import { SignupFormContainerComponent } from './SignupForm.types';
import { SIGNUP } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';
import { SignupFormView } from './SignupForm.view';
import { useRedirectAfterAuth } from '../shared/hooks';

export const SignupFormContainer: SignupFormContainerComponent = () => {
  const [signup, { error }] = useMutation(SIGNUP, {
    refetchQueries: [{ query: CURRENT_USER }]
  });

  useRedirectAfterAuth('/profile');

  const errors = error?.graphQLErrors.map((error) => error.message) ?? [];

  async function onSignup({
    email,
    password
  }: {
    email: string;
    password: string;
  }) {
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

  return <SignupFormView onSignup={onSignup} errors={errors} />;
};
