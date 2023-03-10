import React, { useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Landing } from "./Landing.js";
import { Home } from "./Home.js";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import Axios from "axios";
import { Register } from "./Register.js";
import Cookies from "js-cookie";

export const AuthContext = React.createContext(null); // we will use this in other components
const queryClient = new QueryClient();

const App = () => {
  Axios({
    method: "GET",
    url: "https://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("app.js", res.data.message);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider className="">
        <Navigation />
        <h1 className="text-zinc-900 font-mono text-3xl m-2 p-2">
          424 Assignment
        </h1>

        <Routes>
          <Route index element={<Home />} />
          <Route
            path="landing"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const Navigation = () => {
  const { value } = useAuth();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    value.checkCookie(Cookies.get("token"));
  }, []);

  return (
    <nav className="bg-zinc-900 p-8 font-mono text-2xl">
      <NavLink className="hover:text-purple-400 mr-4" to="/home">
        Home
      </NavLink>
      <NavLink className="hover:text-purple-400 mr-4 ml-4" to="/landing">
        Landing
      </NavLink>
      {value.token && (
        <button
          className="ml-4 hover:text-purple-400"
          type="button"
          onClick={value.onLogout}
        >
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default App;
