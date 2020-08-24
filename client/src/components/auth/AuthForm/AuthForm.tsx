import React, { useEffect } from 'react';
import { AuthFormComponent } from './AuthForm.types';
import { usePasswordCheck } from './hooks';

const AuthForm: AuthFormComponent = ({onSubmit, validatePassword = false, errors = []}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [passwordOk, failReason] = usePasswordCheck(validatePassword, password, confirmPassword);

  useEffect(() => {
    console.debug("Password check passed:", passwordOk);
    failReason && console.debug("Fail reason:", failReason);
  }, [passwordOk, failReason])

  function onFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmit({ email, password });
  }

  return (<div className="row">
  <form className="col s6" onSubmit={onFormSubmit}>
    <div className="input-field outlined">
      <input
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="input-field">
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {validatePassword && <div>
      <input
          name="confirm-password"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    }

    <div className="errors">
      {errors.map((error) => (
        <div key={error}>
          {error}
        </div>
      ))}
    </div>
    <button className="btn" onClick={onFormSubmit}>
      Submit
    </button>
  </form>
</div>);
}

export default AuthForm;
