import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { constructionService } from "@/services/constructionService";
import { servicesService } from "@/services/servicesService";
import type { Construction } from "@/types/construction.types";
import type { ReactNode } from "react";

interface Filters {
  search?: string;
  state?: string;
  status?: string;
}

interface CardData {
  total: number;
  inProgress: number;
  delayed: number;
  completed: number;
}

interface ConstructionsContextType {
  constructions: Construction[];
  cardData: CardData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  constructionsProgress: Record<string, number>;
}

const ConstructionsContext = createContext<ConstructionsContextType | null>(null);

export function ConstructionsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [constructions, setConstructions] = useState<Construction[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [constructionsProgress, setConstructionsProgress] = useState<Record<string, number>>({});


  const fetchConstructions = useCallback(async () => {
    if (!isAuthenticated) return;

    if (!hasLoadedOnce) setIsLoading(true);
    setError(null);

    const query: any = {};
    if (filters.search) query.name = `%${filters.search}%`;
    if (filters.state) query.state = filters.state;
    if (filters.status) query.status = filters.status;

    try {
      const data = await constructionService.find(query);
      setConstructions(data);

      const progressPromises = data.map(c => 
          servicesService.calculateProgressByConstruction(c.id)
            .then(result => ({ id: c.id, progress: result.progress }))
            .catch(err => {
                console.error(`Erro ao calcular progresso para ${c.name}:`, err);
                return { id: c.id, progress: 0 };
            })
      );

      const progressResults = await Promise.all(progressPromises);
      
      // Cria o mapa { [id]: porcentagem }
      const newProgressMap = progressResults.reduce((acc, current) => {
          acc[current.id] = current.progress;
          return acc;
      }, {} as Record<string, number>);
      
      setConstructionsProgress(newProgressMap);

    } catch (err) {
      setError((err as any)?.message || "Falha ao carregar construções");
    } finally {
      setIsLoading(false);
      setHasLoadedOnce(true);
    }
  }, [filters, isAuthenticated, hasLoadedOnce]);

  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated) {
      fetchConstructions();
    }
  }, [isLoadingAuth, isAuthenticated, fetchConstructions]);

  // Calcula os cards dinamicamente
  const now = new Date();
  const inProgress = constructions.filter(c => {
    if (c.finished_at) return false;
    const start = c.start_date ? new Date(c.start_date) : null;
    const end = c.expected_end_date ? new Date(c.expected_end_date) : null;
    return start && start <= now && end && end >= now;
  }).length;

  const delayed = constructions.filter(c => {
    if (c.finished_at) return false;
    const end = c.expected_end_date ? new Date(c.expected_end_date) : null;
    return end && end < now;
  }).length;

  const completed = constructions.filter(c => !!c.finished_at).length;
  const total = constructions.length;

  return (
    <ConstructionsContext.Provider value={{
      constructions,
      cardData: { total, inProgress, delayed, completed },
      isLoading,
      error,
      refetch: fetchConstructions,
      filters,
      setFilters,
      constructionsProgress
      
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
