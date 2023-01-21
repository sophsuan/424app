import React from "react";
//import { AuthContext } from "./App.js";
import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  //const token = React.useContext(AuthContext);
  const { value } = useAuth();
  return (
    <>
      <h2>Landing (Protected)</h2>
      {/*<div> Authenticated as {token}</div>*/}
      <div> Authenticated as {value.token}</div>
    </>
  );
};