import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Landing } from "./Landing.js";
import { Home } from "./Home.js";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { fakeAuth } from "./utils/FakeAuth.js";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import Axios from "axios";
import { Register } from "./Register.js";

export const AuthContext = React.createContext(null); // we will use this in other components
const queryClient = new QueryClient();

const App = () => {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
        <h1 className="text-blue-900">424 Assignment</h1>

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
  return (
    <nav className="bg-blue-900 ">
      <NavLink className="hover:text-blue-300" to="/home">
        Home
      </NavLink>
      <NavLink className="hover:text-blue-300" to="/landing">
        Landing
      </NavLink>
      {value.token && (
        <button
          className="hover:text-blue-300"
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
