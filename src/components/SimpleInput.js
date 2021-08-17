import { useEffect, useState } from 'react';
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [enterEmail, setEnterEmail] = useState('');
  const [enterEmailTouched, setEnterEmailTouched] = useState(false);

  const emailValidationRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameValidation = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

  const enteredEmailIsValid = emailValidationRegex.test(enterEmail);

  // const enteredEmailIsValid = !re;
  const emailInputIsInvalid = !enteredEmailIsValid && enterEmailTouched;

  const enteredNameIsValid =
    enteredName.trim().length >= 3 && nameValidation.test(nameValidation);
  const nameInputHasError = !enteredNameIsValid && enteredNameTouched;

  // prideti email input ir prie pavaldinuoti prie esamos logikos
  // email turi tureti @ ir taska po @.

  useEffect(() => {
    enteredNameIsValid && enteredEmailIsValid
      ? setFormIsValid(true)
      : setFormIsValid(false);
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const nameInputChangeHandler = (event) => {
    console.log('keystroke');
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    console.log('email keystroke');
    setEnterEmail(event.target.value);
  };
  const formSubmissionHandler = (event) => {
    // sustabdyti forma nuo siuntimo nustatytuoju budu
    event.preventDefault();

    // formos siuntimas reiskia kad visi laukai yra paliesti
    setEnterEmailTouched(true);
    setEnteredNameTouched(true);

    // validacija
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // isvalyti input po submit
    setEnteredName('');
    setEnteredNameTouched(false);
    setEnterEmail('');
    setEnterEmailTouched(false);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // validacija
    if (!enteredNameIsValid) {
      return;
    }
  };
  const emailInputHandler = (event) => {
    setEnterEmailTouched(true);
    if (!enteredEmailIsValid) {
      return;
    }
  };
  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';
  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';
  return (
    <form autoComplete="off" onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
        />{' '}
        {nameInputHasError && (
          <p className="error-text">Name must be at least 3 characters long</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Email</label>
        <input
          value={enterEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputHandler}
          type="email"
          id="email"
        />
        {emailInputIsInvalid && (
          <p className="error-text">Please provide a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
