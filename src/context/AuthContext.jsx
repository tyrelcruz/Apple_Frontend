import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("type") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );

  useEffect(() => {
    setUserType(localStorage.getItem("type") || "");
    setToken(localStorage.getItem("token") || "");
    setFirstName(localStorage.getItem("firstName") || "");
  }, []);

  const login = ({ token, type, firstName }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
    localStorage.setItem("firstName", firstName);
    setToken(token);
    setUserType(type);
    setFirstName(firstName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("firstName");
    setToken("");
    setUserType("");
    setFirstName("");
  };

  return (
    <AuthContext.Provider value={{ userType, token, firstName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
