import React, { useState, useEffect } from "react";

import authService from "../services/authService";
import { AuthContext } from "./AuthContext";
import { User } from "../types/index";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const onLogin = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const onLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
