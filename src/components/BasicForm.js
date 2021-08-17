import { useEffect, useState } from 'react';
import useInput from './../hook/useInput';
const BasicForm = (props) => {
  const nameValidation = (x) => {
    return x.trim().length >= 3;
  };
  const emailValidation = (e) => e.includes('@') && e.includes('.');
  const passwordValidation = (p) => {
    return p.trim().length >= 4;
  };
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(nameValidation);
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(passwordValidation);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidation);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid
      ? setFormIsValid(true)
      : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid, enteredPasswordIsValid]);

  const formSubmissionHandler = (event) => {
    // sustabdyti forma nuo siuntimo nustatytuoju budu
    event.preventDefault();

    // validacija
    if (!formIsValid) {
      return;
    }

    // isvalyti input po submit
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  // computed classes
  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';
  // email
  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';
  // password
  const passwordInputClasses = passwordInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form autoComplete="off" onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <div className="form-control">
          <label htmlFor="name">First Name</label>
          <input
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            id="name"
          />
          {nameInputHasError && (
            <p className="error-text">Name must be at least 3 letters</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="name">Password</label>
          <input
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            id="password"
          />
          {passwordInputHasError && (
            <p className="error-text">Password must be at least 3 letters</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
          id="email"
        />
        {emailInputHasError && (
          <p className="error-text">Email must be valid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
