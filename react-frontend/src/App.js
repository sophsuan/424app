import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Landing } from "./Landing.js";
import { Home } from "./Home.js";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth.js";

export const AuthContext = React.createContext(null);  // we will use this in other components

const App = () => {
    //const [user, setUser] = useState(null);
    const [token, setToken] = React.useState(null);

    const handleLogin = async () => {
        const token = await fakeAuth();
        setToken(token);
      
      };
      const handleLogout = () => setToken(null);

  return (
    <>
    {/*
      <Navigation />
      {token ? (
<button onClick={handleLogout}>Sign Out</button>
) : (
<button onClick={handleLogin}>Sign In</button>
)}
*/}
<Navigation />
<AuthContext.Provider value={token}>
<h1>React Router</h1>
<Routes>
<Route index element={<Home onLogin={handleLogin} />} />
 <Route path="landing" element={<Landing />} />
 <Route path="home" element={<Home onLogin={handleLogin} />} />
 <Route path="*" element={<p>There's nothing here: 404!</p>} />
</Routes>
</AuthContext.Provider>
</>
);
};

const Navigation = ({ token, onLogout }) => (
    <nav>
    <NavLink to="/landing">Landing</NavLink>
    {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
       </button>
       )
    }
    </nav>
);

export default App;