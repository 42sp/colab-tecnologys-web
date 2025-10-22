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
}

const ConstructionsContext = createContext<ConstructionsContextType | null>(null);

export function ConstructionsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [constructions, setConstructions] = useState<Construction[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

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
