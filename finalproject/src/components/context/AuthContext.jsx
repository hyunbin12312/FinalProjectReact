import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    if (accessToken && refreshToken && username) {
      setAuth({
        username,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username, accessToken, refreshToken) => {
    setAuth({
      username,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth({
      username: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
