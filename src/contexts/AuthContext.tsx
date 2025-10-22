import React, { createContext, useContext, useState, useEffect } from "react";
import client from "../feathers";
import { useNavigate } from "react-router-dom";

interface User {
  id?: string;
  name: string;
  email?: string;
  photo?: string | null;
  phone?: string;
  roleId?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (cpf: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    client
      .reAuthenticate()
      .then((response: any) => {
        const profile = response?.meta?.profile || response.user;
        if (profile) {
          setIsAuthenticated(true);
          setUser(profile);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => setIsLoadingAuth(false));
  }, []);

  const login = async (cpf: string, password: string, rememberMe: boolean) => {
    const response: any = await client.authenticate({
      strategy: "local",
      cpf: cpf.replace(/\D/g, ""),
      password: password,
    });

    const profile = response?.meta?.profile || response.user;
    if (profile) {
      setIsAuthenticated(true);
      setUser(profile);
    }
  };

  const logout = async () => {
    await client.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
