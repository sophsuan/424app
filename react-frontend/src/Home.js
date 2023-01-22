import { ErrorResponse } from "@remix-run/router";
import { useAuth } from "./context/AuthProvider";
import React, { useState, useEffect } from "react";
// code referenced from : https://contactmentor.com/login-form-react-js-code/

const database = [
  {
    username: "bj",
    password: "pass424"
  }
];

const errors = {
  uname: "invalid username",
  pass: "invalid password"
};

export const Home = () => { 
  const { value } = useAuth();
  const [errorMessages, setErrorMessages] = useState({});

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = (event) => {
    event.preventDefault();

    var {uname, pass } = document.forms[0];

    const userData = database.find((user) => user.username === uname.value);
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass }); 
      } else {
      value.onLogin();
    }
  } else {
    // Username not found
    setErrorMessages({ name: "uname", message: errors.uname });
  }
    }

    return (
      <>
        <h2>Home (Public)</h2>
        <div>
        <form onSubmit={handleSubmit}>
        <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required />
    {renderErrorMessage("uname")}
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />
    {renderErrorMessage("pass")}
        <button type="submit" onClick={value.onLogin}>
          Sign In
        </button>
        </form>
        </div>
    </>
  );
  };
