import React from "react";
//import { AuthContext } from "./App.js";
import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  //const token = React.useContext(AuthContext);
  const { value } = useAuth();
  console.log("landing", value.token);
  return (
    <>
      <h2 className="text-black">Landing (Protected)</h2>
      <div className="text-blue-900 animate-pulse font-black text-[50px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
        {" "}
        Authenticated as {value.token.data}
      </div>
    </>
  );
};
