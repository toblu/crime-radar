import React from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { NotificationBox } from '../../NotificationBox';
import { AuthFormViewComponent } from './AuthForm.types';

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

export const AuthFormView: AuthFormViewComponent = ({
    email,
    password,
    confirmPassword,
    onFieldChange,
    onSubmit,
    errorFields,
    errorMessages,
    validatePassword,
    errors,
    isValid
}) => {
    const classes = useStyles();

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form className={classes.root} onSubmit={onFormSubmit}>
            <div className={classes.rowWrapper}>
                <TextField
                    required
                    label="Email"
                    name="email"
                    onChange={onFieldChange}
                    variant="outlined"
                    fullWidth
                    error={email ? errorFields.email : false}
                    helperText={
                        email && errorFields.email && errorMessages.email
                    }
                />
            </div>
            <div className={classes.rowWrapper}>
                <TextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    onChange={onFieldChange}
                    variant="outlined"
                    fullWidth
                    error={password ? errorFields.password : false}
                    helperText={
                        password &&
                        errorFields.password &&
                        errorMessages.password
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
                        onChange={onFieldChange}
                        variant="outlined"
                        fullWidth
                        error={
                            confirmPassword
                                ? errorFields.confirmPassword
                                : false
                        }
                        helperText={
                            confirmPassword &&
                            errorFields.confirmPassword &&
                            errorMessages.confirmPassword
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
                onClick={onSubmit}
                disabled={!isValid}
            >
                Submit
            </Button>
        </form>
    );
};
