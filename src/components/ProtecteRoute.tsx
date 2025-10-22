import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/layouts/TopBar";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Componente para proteger rotas privadas.
 * - Espera o AuthContext terminar a reautenticação inicial.
 * - Redireciona para /login se o usuário não estiver autenticado.
 * - Envolve conteúdo autenticado no layout TopBar.
 */
export default function ProtecteRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  // Enquanto o AuthContext ainda está verificando o estado de autenticação
  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para /login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo dentro do layout principal
  return <TopBar>{children}</TopBar>;
}
