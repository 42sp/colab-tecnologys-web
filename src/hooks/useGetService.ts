import { useState, useEffect, useCallback } from "react";
import type { Services as TableServiceData } from "../components/Services/TableColumns";
import { servicesService } from "@/services/servicesService";
import { useAuth } from "@/contexts/AuthContext";

interface HookResult {
  services: TableServiceData[];
  isLoading: boolean;
  error: string | null;
}

const mapDbServiceToTableLine = (dbService: any): TableServiceData => {
  const isMarcacao = dbService.service_id.startsWith("M-");
  const isFixacao = dbService.service_id.startsWith("F-");
  const isElevacao = dbService.service_id.startsWith("E-"); // Calcula os valores, zerando se não for o tipo correto

  const marcacaoValue = isMarcacao ? dbService.labor_quantity : 0;
  const fixacaoValue = isFixacao ? dbService.labor_quantity : 0;
  const elevacaoValue = isElevacao ? dbService.labor_quantity : 0;

  return {
    id: dbService.service_id, // Usamos o ID completo do serviço (M-xxx, F-xxx ou E-xxx)
    torre: dbService.tower,
    pav: dbService.floor,
    apartamento: dbService.apartment,
    unidadeMedida: dbService.measurement_unit,
    parede: dbService.stage,
    espessura: dbService.thickness?.toString() || "0",
    marcacao: marcacaoValue, // 0 ou valor real
    fixacao: fixacaoValue, // 0 ou valor real
    elevacao: elevacaoValue, // 0 ou valor real
    quantMat: dbService.material_quantity || 0,
    quantMod: dbService.worker_quantity || 0,
  };
};

export const useGetServices = (
  workId: string | null,
  filters: any,
  refetchIndex: number
): HookResult => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [services, setServices] = useState<TableServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    if (!isAuthenticated) {
      console.warn(
        "[useGetServices] Usuário não autenticado. Busca cancelada."
      );
      setIsLoading(false);
      setServices([]);
      return;
    }

    if (!workId) {
      console.error(
        "[useGetServices] ERRO: ID da Construção ausente. Não será feita a busca."
      );
      setError("ID da Construção (work_id) não encontrado.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("[FETCH] workId sendo buscado:", workId);

      const { text, ...restFilters } = filters;

      const queryParams: any = {
        work_id: workId,
        $limit: 1000,
        $sort: { tower: 1, floor: 1, apartment: 1 },
      };

      Object.assign(queryParams, restFilters);

      if (filters.tower && filters.tower !== "all") {
        queryParams.tower = filters.tower;
      }
      if (filters.floor && filters.floor !== "all") {
        queryParams.floor = filters.floor;
      }

      if (filters.acronym && filters.acronym !== "all") {
        queryParams.acronym = filters.acronym;
        console.log(
          `[FETCH] Aplicando filtro de Classificação: ${filters.acronym}`
        );
      }

      if (text && text.trim() !== "") {
        queryParams.$search = text.trim();
        console.log(`[FETCH] Aplicando filtro de Busca Rápida: ${text}`);
      } else {
        delete queryParams.$search;
      }

      console.log("[FETCH] Query Params:", queryParams);

      const dbServices = await servicesService.find(queryParams);

      const data = Array.isArray(dbServices) ? dbServices : [];
      console.log(
        "[useGetServices] Resposta da API:",
        data.length,
        "registros encontrados."
      );

      const mappedData = data.map(mapDbServiceToTableLine);
      setServices(mappedData);
    } catch (err: any) {
      console.error(
        "Erro ao buscar serviços (detalhe):",
        err.name,
        err.message,
        err.code,
        err
      );
      setError(
        `Erro ao carregar serviços: ${
          err.message || "Falha na comunicação com o servidor."
        } (Código: ${err.code || "N/A"})`
      );
      setServices([]); // Limpa os serviços em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, [workId, filters, isAuthenticated]);

  useEffect(() => {
    if (!isLoadingAuth) {
      fetchServices();
    }
  }, [isLoadingAuth, fetchServices, refetchIndex]);

  return { services, isLoading, error };
};
