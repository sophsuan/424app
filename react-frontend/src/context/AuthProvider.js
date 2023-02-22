import { createContext, useContext, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";
Axios.defaults.baseURL = "https://localhost:5000";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (userData) => {
      return Axios.post("/users/login", userData);
    },
    {
      onSuccess: (data) => {
        setToken(data.data.token);
        Cookies.set("token", data.data.token, { expires: 0.1 }); // ~2.5 hours
        navigate("/landing");
      },
    }
  );

  const handleLogin = (data) => {
    mutation.mutate({ userid: data.uname, password: data.pwd });
  };

  const handleLogout = () => {
    setToken(null);
    Cookies.remove("token");
  };

  const handleCookie = (cookieToken) => {
    if (!cookieToken) {
      return null;
    }
    setToken(cookieToken);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    checkCookie: handleCookie,
  };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
