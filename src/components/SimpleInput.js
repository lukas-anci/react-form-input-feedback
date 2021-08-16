import { useState, useRef } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameInputRef = useRef();
  const nameInputChangeHandler = (e) => {
    console.log('keystroke');
    setEnteredName(e.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // formos siuntimas reiskia kad visi laukai yra paliesti
    setEnteredNameTouched(true);

    // validacija
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
    console.log('ivesta', enteredName);
    // naudojant ref gauti ivesites lauko reiksme
    const enteredValue = nameInputRef.current.value;
    console.log('value using ref', enteredValue);
    // isvalyti input po submit
    setEnteredName('');
    setEnteredNameIsValid(true);

    //nerekuomenduojama
    // nameInputRef.current.value=''
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = !nameInputIsInvalid
    ? 'form-control'
    : 'form-control invalid';
  return (
    <form autoComplete="off" onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          value={enteredName}
          onChange={nameInputChangeHandler}
          type="text"
          id="name"
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
