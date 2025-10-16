import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { constructionService } from "@/services/constructionService";
//import { useLogger } from "@/components/Logger/useLogger";
import type { Construction } from "@/types/construction.types";

interface FetchParams {
  stateFilter?: string;
  statusFilter?: string;
  searchQuery?: string;
}

interface UseConstructionsResult {
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
}

export const useConstructions = (
  params?: FetchParams
): UseConstructionsResult => {
  const { isAuthenticated } = useAuth();
  const [constructions, setConstructions] = useState<Construction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const logger = useLogger();

  const fetchConstructions = useCallback(async () => {
    if (!isAuthenticated) {
      //logger.warn("CONSTRUCTION_HOOK", "Usuário não autenticado");
      setError("Não autenticado. Faça login.");
      setIsLoading(false);
      setConstructions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const query: Record<string, any> = {};
    if (params?.stateFilter && params.stateFilter !== "all") {
      query.state = params.stateFilter;
    }
    if (params?.statusFilter && params.statusFilter !== "all") {
      query.status = params.statusFilter;
    }
    if (params?.searchQuery && params.searchQuery.trim() !== "") {
      query.name = `%${params.searchQuery.trim()}%`;
    }

    //logger.info("CONSTRUCTION_HOOK", "Query enviada para backend:", query);

    try {
      const data = await constructionService.find(query);
      //logger.info("CONSTRUCTION_HOOK", "Dados recebidos do backend:", data);
      setConstructions(data);
    } catch (err) {
      //logger.error("CONSTRUCTION_HOOK", "Erro ao buscar construções:", err);
      setError((err as any)?.message || "Falha ao carregar os dados");
      setConstructions([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    isAuthenticated,
    params?.stateFilter,
    params?.statusFilter,
    params?.searchQuery,
  ]);

  useEffect(() => {
    fetchConstructions();
  }, [fetchConstructions]);

  const total = constructions.length;
  const inProgress = constructions.filter(
    (c) => c.status === "Em Andamento"
  ).length;
  const delayed = constructions.filter((c) => c.status === "Atrasado").length;
  const completed = constructions.filter(
    (c) => c.status === "Concluído"
  ).length;

  return {
    constructions,
    cardData: { total, inProgress, delayed, completed },
    isLoading,
    error,
    refetch: fetchConstructions,
  };
};
