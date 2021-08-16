import { useState, useRef } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const nameInputRef = useRef();
  const nameInputChangeHandler = (e) => {
    console.log('keystroke');
    setEnteredName(e.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log('ivesta', enteredName);
    // naudojant ref gauti ivesites lauko reiksme
    const enteredValue = nameInputRef.current.value;
    console.log('value using ref', enteredValue);
    // isvalyti input po submit
    setEnteredName('');

    //nerekuomenduojama
    // nameInputRef.current.value=''
  };
  return (
    <form autoComplete="off" onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          value={enteredName}
          onChange={nameInputChangeHandler}
          type="text"
          id="name"
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
