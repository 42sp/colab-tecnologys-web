import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../feathers';
import { useNavigate } from 'react-router-dom';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // 1. Tentar reautenticar ao carregar a página (se houver token no storage)
    useEffect(() => {
        client.reAuthenticate()
            .then((response: any) => {
                const loggedInUser = response.user as User;
                setIsAuthenticated(true);
                setUser(loggedInUser);
                // console.log("Reautenticação bem-sucedida");
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
                // console.log("Nenhum token válido encontrado");
            });
    }, []);

    // 2. Função de Login que interage com o Backend
    const login = async (cpf: string, password: string, rememberMe: boolean): Promise<void> => {

        
        const response: any = await client.authenticate({
            strategy: 'local',
            cpf: cpf.replace(/\D/g, ''), 
            password: password,
        });

        const loggedInUser = response.user as User;
        setIsAuthenticated(true);
        setUser(loggedInUser);
    };

    // 3. Função de Logout
    const logout = async (): Promise<void> => {
        await client.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para usar o AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};