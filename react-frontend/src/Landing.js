import React, { useState } from "react";
//import { AuthContext } from "./App.js";
import { useAuth } from "./context/AuthProvider";
import Axios from "axios";
Axios.defaults.baseURL = "https://localhost:5000";

export const Landing = () => {
  //const token = React.useContext(AuthContext);
  const { value } = useAuth();
  console.log("landing", value);
  const { users, setUsers } = useState("");

  // currently erroring because of certificate error in get request
  Axios.get("/users")
    .then((data) => {
      console.log(data);
      setUsers(data);
    })
    .catch((e) => {
      console.log(e);
    });

  console.log(users);

  // const [tok, setTok] = useState(Cookies.get("token"));

  return (
    <>
      <h2 className="text-black">Landing (Protected)</h2>
      <div className="text-blue-900 animate-pulse font-black text-[50px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
        {" "}
        Authenticated as {value.token}
      </div>
      {users.map((user) => {
        <div>user.id</div>;
      })}
    </>
  );
};
