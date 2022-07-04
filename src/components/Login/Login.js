import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

// ! REDUCER DISPATCH FUNCTIONS
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }
  }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
}

// ! LOGIN COMPONENT'S FUNCTION
const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: false });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 200);

    return () => {
      clearTimeout(identifier)
    };
  }, [emailIsValid, passwordIsValid])


  // ! HANDLERS FUNCTIONS
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLoging(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input ref={emailInputRef} type="email" id="email" value={emailState.value} name="Email" isValid={emailIsValid} onChange={emailChangeHandler} onBlur={validateEmailHandler}></Input>
        <Input ref={passwordInputRef} type="password" id="password" value={passwordState.value} name="Password" isValid={passwordIsValid} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
