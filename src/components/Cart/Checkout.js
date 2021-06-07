import classes from './Checkout.module.css';

import useInput from '../../hooks/use-input';

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    inputTouchedOnConfirm: nameTouchedOnConfirm,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    inputTouchedOnConfirm: streetTouchedOnConfirm,
    reset: resetStreetInput,
  } = useInput((value) => /^\d+\s[A-z]+\s[A-z]+/.test(value));

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    inputTouchedOnConfirm: postalCodeTouchedOnConfirm,
    reset: resetPostalCodeInput,
  } = useInput((value) => /^\d{5}$/.test(value));

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    inputTouchedOnConfirm: cityTouchedOnConfirm,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    nameTouchedOnConfirm();
    streetTouchedOnConfirm();
    postalCodeTouchedOnConfirm();
    cityTouchedOnConfirm();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameControlClasses = `${classes.control} ${
    nameInputHasError ? classes.invalid : ''
  }`;
  const streetControlClasses = `${classes.control} ${
    streetInputHasError ? classes.invalid : ''
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalCodeInputHasError ? classes.invalid : ''
  }`;
  const cityControlClasses = `${classes.control} ${
    cityInputHasError ? classes.invalid : ''
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={enteredStreet}
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && (
          <p>Please enter a valid address (e.g. 67 Park Street).</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          value={enteredPostalCode}
          onChange={postalCodeChangedHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeInputHasError && (
          <p>Please enter a valid postal code (five digits long).</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={enteredCity}
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
