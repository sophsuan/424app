import React, { useEffect, useState } from "react";
//import { AuthContext } from "./App.js";
import { useAuth } from "./context/AuthProvider";
import Axios from "axios";
// Axios.defaults.baseURL = "https://localhost:5000";

export const Landing = () => {
  //const token = React.useContext(AuthContext);
  const { value } = useAuth();
  // console.log("landing", value);
  const [users, setUsers] = useState([]);
  // currently erroring because of certificate error in get request
  useEffect(() => {
    Axios.get("https://localhost:5000/users", {
      headers: { Authorization: `token ${value.token}` },
    })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // const [tok, setTok] = useState(Cookies.get("token"));
  return (
    <div className="text-zinc-900 font-mono m-2 p-2">
      <h2 className="font-black text-zinc-900 text-4xl font-mono m-2 p-2">
        Landing (Protected)
      </h2>
      <div className="text-zinc-900 p-2 m-2 truncate animate-pulse font-black text-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
        Authenticated as {value.token}
      </div>
      <div className="bg-[url('../public/omori-headspace.png')] font-black text-white m-2 p-2">
        <ul className="list-decimal text-md pl-12">
          {users.map((user) => {
            return <li key={user.id}>{user.id}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
