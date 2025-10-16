import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { constructionService } from "@/services/constructionService";
import type { Construction } from "@/types/construction.types";
import type { ReactNode } from "react";

interface Filters {
  search?: string;
  state?: string;
  status?: string;
}

interface ConstructionsContextType {
  constructions: Construction[];
  cardData: {
    total: number;
    inProgress: number;
    delayed: number;
    completed: number;
  };
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const ConstructionsContext = createContext<ConstructionsContextType | null>(null);

export function ConstructionsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [constructions, setConstructions] = useState<Construction[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConstructions = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    const query: any = {};
    if (filters.search) query.name = `%${filters.search}%`;
    if (filters.state) query.state = filters.state;
    if (filters.status) query.status = filters.status;

    try {
      const data = await constructionService.find(query);
      setConstructions(data);
    } catch (err) {
      setError((err as any)?.message || "Falha ao carregar construções");
    } finally {
      setIsLoading(false);
    }
  }, [filters, isAuthenticated]);

  // Só executa após autenticação estar pronta e usuário logado
  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated) {
      fetchConstructions();
    }
  }, [isLoadingAuth, isAuthenticated, fetchConstructions]);

  const total = constructions.length;
  const inProgress = constructions.filter(c => c.status === "Em Andamento").length;
  const delayed = constructions.filter(c => c.status === "Atrasado").length;
  const completed = constructions.filter(c => c.status === "Concluído").length;

  return (
    <ConstructionsContext.Provider value={{
      constructions,
      cardData: { total, inProgress, delayed, completed },
      isLoading,
      error,
      refetch: fetchConstructions,
      filters,
      setFilters
    }}>
      {children}
    </ConstructionsContext.Provider>
  );
}

export function useConstructionsContext() {
  const ctx = useContext(ConstructionsContext);
  if (!ctx) throw new Error("useConstructionsContext deve ser usado dentro de ConstructionsProvider");
  return ctx;
}
