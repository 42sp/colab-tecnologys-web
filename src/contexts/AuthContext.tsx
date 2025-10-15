import React, { createContext, useContext, useState, useEffect } from "react";
import client from "../feathers";
import logger from '@/utils/logger';
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  cpf: string;
  name: string;
  roleId: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (cpf: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Tentar reautenticar ao carregar a página (se houver token no storage)
  useEffect(() => {
        logger.info("AUTH", "Iniciando reautenticação.");

        client.reAuthenticate()
            .then((response: any) => {
                const loggedInUser = response.user as User;
                setIsAuthenticated(true);
                setUser(loggedInUser);
                logger.info("AUTH", "Reautenticação bem-sucedida. Usuário:", loggedInUser);
            })
            .catch((err) => {
                setIsAuthenticated(false);
                setUser(null);
                logger.warn("AUTH", "Nenhum token válido encontrado ou reautenticação falhou.", err);
            })
            .finally(() => {
                setIsLoadingAuth(false);
                logger.info("AUTH", "Processo de autenticação inicial concluído.");
            });
    }, []);

  // Função de Login que interage com o Backend
  const login = async (cpf: string, password: string, rememberMe: boolean): Promise<void> => {
        logger.info("AUTH", `Tentando login para CPF: ${cpf}`);
        try {
            const response: any = await client.authenticate({
                strategy: "local",
                cpf: cpf.replace(/\D/g, ""),
                password: password,
            });

            const loggedInUser = response.user as User;
            setIsAuthenticated(true);
            setUser(loggedInUser);
            logger.info("AUTH", "Login realizado com sucesso. Usuário:", loggedInUser);
        } catch (err) {
            logger.error("AUTH", "Erro na tentativa de login.", err);
            throw err;
        }
    };

  const logout = async (): Promise<void> => {
    await client.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoadingAuth  }}>
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
