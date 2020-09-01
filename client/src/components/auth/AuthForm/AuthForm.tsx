import React, { useEffect } from 'react';
import { AuthFormComponent } from './AuthForm.types';
import { usePasswordCheck } from './hooks';
import { TextField, Button, makeStyles } from '@material-ui/core';

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
    flexBasis: '64px',
    margin: '8px',
    minHeight: '54px'
  },
  errors: {
    flexBasis: '24px',
    margin: '4px 8px'
  }
});

const AuthForm: AuthFormComponent = ({
  onSubmit,
  validatePassword = false,
  errors = []
}) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [passwordOk, failReason] = usePasswordCheck(
    validatePassword,
    password,
    confirmPassword
  );

  useEffect(() => {
    console.debug('Password check passed:', passwordOk);
    failReason && console.debug('Fail reason:', failReason);
  }, [passwordOk, failReason]);

  function onFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ email, password });
  }

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={onFormSubmit}>
      <div className={classes.rowWrapper}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={classes.rowWrapper}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </div>
      {validatePassword && (
        <div className={classes.rowWrapper}>
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </div>
      )}

      <div className={classes.errors}>
        {errors.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={onFormSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
