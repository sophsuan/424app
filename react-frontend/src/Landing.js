import React from "react";
import { AuthContext } from "./App.js";
export const Landing = () => {
  const token = React.useContext(AuthContext);
  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {token}</div>
    </>
  );
};