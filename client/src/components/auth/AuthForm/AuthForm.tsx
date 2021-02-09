import React from 'react';
import { AuthFormComponent } from './AuthForm.types';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { useForm } from '../../shared/hooks/useForm';
import NotificationBox from '../../NotificationBox';
import { emailRegexp, passwordRegexp } from '@crime-alert/shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    maxWidth: '400px',
    maxHeight: '600px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column'
  },
  rowWrapper: {
    width: '100%',
    flexBasis: '76px',
    margin: '8px'
  },
  errors: {
    flexBasis: '24px',
    margin: '4px 8px'
  }
});

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

const AuthForm: AuthFormComponent = ({
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

  function onFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ email, password });
  }

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={onFormSubmit}>
      <div className={classes.rowWrapper}>
        <TextField
          required
          label="Email"
          name="email"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          error={email ? errorFields.email : false}
          helperText={email && errorFields.email && validationErrors['email']}
        />
      </div>
      <div className={classes.rowWrapper}>
        <TextField
          required
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          error={password ? errorFields.password : false}
          helperText={
            password && errorFields.password && validationErrors['password']
          }
        />
      </div>
      {validatePassword && (
        <div className={classes.rowWrapper}>
          <TextField
            required
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={confirmPassword ? errorFields.confirmPassword : false}
            helperText={
              confirmPassword &&
              errorFields.confirmPassword &&
              validationErrors['confirmPassword']
            }
          />
        </div>
      )}
      {errors.map((error) => (
        // <div key={error} className={classes.rowWrapper}>
        <NotificationBox level="error">{error}</NotificationBox>
        // </div>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
