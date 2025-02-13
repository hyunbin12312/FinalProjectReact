import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");

    if (username && accessToken && refreshToken && role) {
      setAuth({
        username,
        accessToken,
        refreshToken,
        role,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username, accessToken, refreshToken, role) => {
    setAuth({
      username,
      accessToken,
      refreshToken,
      role,
      isAuthenticated: true,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);
  };
  console.log(auth);

  const logout = () => {
    setAuth({
      username: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
