import { useState, useEffect, useCallback } from "react";
import type { Services as TableServiceData } from "../components/Services/TableColumns";
import { servicesService } from "@/services/servicesService";
import { useAuth } from "@/contexts/AuthContext";

interface HookResult {
  services: TableServiceData[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

interface ServiceDbRecord {
  work_id: string;
  service_id: string;
  service_code: string;

  tower: string;
  floor: string;
  apartment: string;
  measurement_unit: string;
  service_description: string;
  stage: string;
  thickness: number;
  labor_quantity: number; // Adicionado para mapDbServiceToTableLine
  material_quantity: number; // Adicionado para mapDbServiceToTableLine
  worker_quantity: number; // Adicionado para mapDbServiceToTableLine
  // Certifique-se de que todos os campos usados no mapDbServiceToTableLine estão aqui!
}

interface PaginatedResponse {
  total: number;
  limit: number;
  skip: number;
  data: ServiceDbRecord[];
}

const mapDbServiceToTableLine = (dbService: any): TableServiceData => {
  const isMarcacao =
    dbService.service_id.startsWith("M-") || dbService.acronym === "M";
  const isFixacao =
    dbService.service_id.startsWith("F-") || dbService.acronym === "F";
  const isElevacao =
    dbService.service_id.startsWith("E-") || dbService.acronym === "E"; // Calcula os valores, zerando se não for o tipo correto

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
  const [total, setTotal] = useState(0);
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
      const { text, $limit, $skip, ...restFilters } = filters;

      const queryParams: any = {
        work_id: workId,
        $limit: $limit,
        $skip: $skip,
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

      // 🚀 CORREÇÃO DE TIPAGEM: Recebemos a resposta como 'unknown' (ou 'any') e
      // tratamos a tipagem condicionalmente.
      const rawResponse: unknown = await servicesService.find(queryParams);
      console.log("[DEBUG] Raw Response da API:", rawResponse);

      let response: PaginatedResponse;

      // Checa se a resposta é o objeto de paginação do Feathers
      if (
        rawResponse &&
        typeof rawResponse === "object" &&
        "data" in rawResponse &&
        Array.isArray((rawResponse as any).data) // Checagem segura para TypeScript
      ) {
        // É uma resposta paginada
        response = rawResponse as PaginatedResponse;
      } else if (Array.isArray(rawResponse)) {
        // É um array simples (paginação desativada)
        response = {
          total: rawResponse.length,
          limit: rawResponse.length,
          skip: 0,
          data: rawResponse as ServiceDbRecord[],
        };
      } else {
        // Fallback para garantir que 'response' tenha o tipo PaginatedResponse
        response = { total: 0, limit: 0, skip: 0, data: [] };
      }

      const dbServices = response.data; // Dados da página atual
      const totalCount = response.total || 0; // Total de registros

      const mappedData = dbServices.map(mapDbServiceToTableLine);

      console.log(
        "[useGetServices] Resposta da API:",
        dbServices.length,
        "registros encontrados."
      );

      setTotal(totalCount);
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
      setTotal(0);
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

  return { services, total, isLoading, error };
};
