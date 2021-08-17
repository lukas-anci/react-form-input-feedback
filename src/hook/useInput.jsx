import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue); // enteredValue.trim().length >= 3;
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
