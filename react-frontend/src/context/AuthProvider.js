import { createContext, useContext, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../utils/FakeAuth";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:5000";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (userData) => {
      return Axios.post("/account/login", userData);
    },
    {
      onSuccess: (data) => {
        setToken(data);
        navigate("/landing");
      },
    }
  );

  const handleLogin = (data) => {
    mutation.mutate({ userid: data.uname, password: data.pwd });
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
