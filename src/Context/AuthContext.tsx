import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: Admin | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<Admin | null>>;
}

interface Admin {
  userName: string | undefined | null;
  token: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
const userString = localStorage.getItem("admin");
const user: Admin | null = userString ? JSON.parse(userString) : null;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Admin | null>(user);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
