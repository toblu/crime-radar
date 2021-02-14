import React from 'react';
import { AuthFormComponent } from './AuthForm.types';
import { useForm } from '../hooks/useForm';
import { emailRegexp, passwordRegexp } from '@crime-alert/shared';
import { AuthFormView } from './AuthForm.view';

const validate = (validatePassword: boolean) => ({
  email,
  password,
  confirmPassword
}: {
  [key: string]: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (!email) {
    errors['email'] = '';
  } else if (!email.match(emailRegexp)) {
    errors['email'] = validatePassword
      ? 'Please provide a valid email adress'
      : '';
  }

  if (!password) {
    errors['password'] = '';
  } else if (validatePassword && !password.match(passwordRegexp)) {
    errors['password'] = 'Password does not meet complexity requirement';
  }

  if (validatePassword) {
    if (!confirmPassword) {
      errors['confirmPassword'] = '';
    } else if (password && confirmPassword !== password) {
      errors['confirmPassword'] = 'Passwords do not match';
    }
  }

  return errors;
};

export const AuthFormContainer: AuthFormComponent = ({
  onSubmit,
  validatePassword = false,
  errors = []
}) => {
  const {
    isValid,
    values: { email, password, confirmPassword },
    errorFields,
    errorMessages: validationErrors,
    handleChange,
    handleSubmit
  } = useForm(() => onSubmit({ email, password }), validate(validatePassword));

  return (
    <AuthFormView
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      onFieldChange={handleChange}
      onSubmit={handleSubmit}
      errorFields={errorFields}
      errorMessages={validationErrors}
      errors={errors}
      isValid={isValid}
      validatePassword={validatePassword}
    />
  );
};
