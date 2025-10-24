import { useState, useEffect, useCallback } from "react";
import type { Services as TableServiceData } from "../components/Services/TableServices";
import { servicesService } from "@/services/servicesService"; 
import { useAuth } from "@/contexts/AuthContext"; 

interface HookResult {
  services: TableServiceData[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Mapeia um único registro do DB (M, F ou E) para uma linha de exibição na tabela.
 * A coluna correspondente ao tipo de serviço recebe o valor, as outras são zeradas.
 */
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

// Hook adaptado para receber parâmetros do Contexto
export const useGetServices = (
  workId: string | null,
  filters: any,
  refetchIndex: number
): HookResult => {
  const { isAuthenticated, isLoadingAuth } = useAuth(); // ✅ Obtendo o status de autenticação
  const [services, setServices] = useState<TableServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    // 🛑 1. CHECK DE AUTENTICAÇÃO (Resolve o problema de timing do JWT)
    if (!isAuthenticated) {
      console.warn("[useGetServices] Usuário não autenticado. Busca cancelada.");
      setIsLoading(false);
      setServices([]);
      return;
    }

    // 🛑 2. CHECK DO workId
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
      
      const queryParams = {
        work_id: workId,
        ...filters,
        $limit: 1000,
        // ✅ REINCLUINDO SORT (Use este formato se você quiser a ordenação de volta)
        $sort: { tower: 1, floor: 1, apartment: 1 },
      };
      
      console.log("[FETCH] Query Params:", queryParams);

      // ✅ Usando a abstração de serviço que trata a resposta do Feathers
      const dbServices = await servicesService.find(queryParams); 

      // Log da resposta
      const data = Array.isArray(dbServices) ? dbServices : [];
      console.log(
        "[useGetServices] Resposta da API:",
        data.length,
        "registros encontrados."
      ); 

      const mappedData = data.map(mapDbServiceToTableLine);
      setServices(mappedData);
    } catch (err: any) {
      // Log mais detalhado
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
    // 🛑 Executa a busca SOMENTE quando o estado de autenticação for resolvido
    if (!isLoadingAuth) {
      fetchServices();
    }
    // O refetchIndex força uma nova execução do fetchServices quando alterado
  }, [isLoadingAuth, fetchServices, refetchIndex]);

  return { services, isLoading, error };
};