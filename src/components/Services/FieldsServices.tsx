import { Plus, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import { toast } from "react-toastify";
import type { Services } from "@/types/services.types";
import { servicesService } from "@/services/servicesService";
import { useServices } from "@/contexts/ServicesContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type CsvData = Record<string, string>;

const FieldsServices = () => {
  const { workId: constructionId } = useParams<{ workId: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refetch: refetchServices, applyFilters, filters } = useServices();
  const queryClient = useQueryClient();

  const { data: filterOptions, isLoading: isLoadingFilters } = useQuery({
    queryKey: ["uniqueFilters", constructionId],
    queryFn: () => servicesService.getUniqueFilters(constructionId || ""),
    enabled: !!constructionId,
    // Recarrega sempre que o componente for montado ou focado para pegar dados novos
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });

  const handleTowerFilterChange = (value: string) => {
    applyFilters({ tower: value });
  };

  const handleFloorFilterChange = (value: string) => {
    applyFilters({ floor: value });
  };

  const handleAcronymFilterChange = (value: string) => {
    applyFilters({ acronym: value });
  };

  const handleTextFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value;
    applyFilters({ text: searchText });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("LOG: Evento onChange disparado no input file.");

    if (!file) {
      console.log("LOG: Usuário cancelou a seleção do arquivo.");
      return;
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Por favor, selecione um arquivo no formato CSV (.csv).");
      console.warn(
        `WARN: Tentativa de upload com formato não suportado: ${file.type}`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    console.log(`LOG: Iniciando parsing do arquivo: ${file.name}`);
    parseCSV(file);
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "utf-8",
      complete: async (results) => {
        const data = results.data as CsvData[];

        if (results.errors.length > 0) {
          toast.error(
            `❌ Erros de formatação encontrados: ${results.errors.length} linha(s) com problema.`
          );
          console.error(
            "ERROR: Erros de PapaParse durante o parsing:",
            results.errors
          );
          return;
        }

        if (data.length === 0) {
          toast.warn(
            "O arquivo CSV está vazio ou os cabeçalhos estão incorretos."
          );
          console.warn("WARN: Dados vazios após o parsing.");
          return;
        }

        const requiredHeaders = [
          "ID",
          "TORRE",
          "PAV",
          "APTO",
          "UNIDADE DE MEDIÇÃO",
          "PAREDE",
          "ESPESSURA",
          "MARCAÇÃO (M)",
          "FIXAÇÃO (M)",
          "ELEVAÇÃO (M²)",
          "QTO MAT (m²)",
          "QTO MOD (m²)",
        ];
        const headers = Object.keys(data[0]);

        const missingHeaders = requiredHeaders.filter(
          (header) => !headers.includes(header)
        );

        if (missingHeaders.length > 0) {
          const missingMsg = missingHeaders.join(", ");
          toast.error(
            `❌ Colunas obrigatórias ausentes: ${missingMsg}. Verifique maiúsculas e minúsculas.`
          );
          console.error(
            `ERROR: Falha na validação de cabeçalho. Faltando: ${missingMsg}`
          );
          console.log("Headers encontrados no arquivo:", headers);
          return;
        }

        try {
          if (!constructionId) {
            toast.error(
              "ID da construção não encontrado na URL. Não é possível prosseguir."
            );
            console.error("ERROR: ID da construção ausente.");
            return;
          }

          toast.info(
            `Processando ${data.length} registros... Mapeando dados para o formato do sistema.`
          );

          const mappedData: Services[] = data.map((item) => {
            // Função auxiliar para converter string para float e lidar com vírgulas/pontos e valores vazios
            const safeParseFloat = (value: string): number => {
              if (!value) return 0;
              const cleanedValue = value.replace(",", ".");
              const parsed = parseFloat(cleanedValue);
              return isNaN(parsed) ? 0 : parsed;
            };

            return {
              work_id: constructionId,
              service_code: item["ID"] || "",
              tower: item["TORRE"] || "",
              floor: item["PAV"] || "",
              apartment: item["APTO"] || "",
              measurement_unit: item["UNIDADE DE MEDIÇÃO"] || "",
              wall: item["PAREDE"] || "",
              // Conversões de tipo:
              thickness: safeParseFloat(item["ESPESSURA"]),
              marking_m: safeParseFloat(item["MARCAÇÃO (M)"]),
              fixation_m: safeParseFloat(item["FIXAÇÃO (M)"]),
              elevation_m2: safeParseFloat(item["ELEVAÇÃO (M²)"]),
              qty_material_m2: safeParseFloat(item["QTO MAT (m²)"]),
              qty_model_m2: safeParseFloat(item["QTO MOD (m²)"]),
            };
          });

          console.log(
            `\n\n✅ SUCESSO NO PARSING: ${mappedData.length} Linhas Mapeadas (PRONTAS PARA API)`
          );
          console.table(mappedData);
          console.log(
            "Dados Completos Mapeados (para inspeção detalhada):",
            mappedData
          );

          const response = await servicesService.importBulk(mappedData);

          toast.success(
            `🎉 Sucesso! ${response.importedCount} serviços importados e validados.`
          );
          console.log(
            `SUCCESS: Importação concluída. ${response.importedCount} registros criados.`,
            response
          );
          refetchServices();
          queryClient.invalidateQueries({
            queryKey: ["uniqueFilters", constructionId],
          });
        } catch (error: any) {
          const apiErrors = error.data?.errors;
          const defaultMessage =
            error.message || "Erro desconhecido ao comunicar com a API.";

          if (apiErrors && Array.isArray(apiErrors) && apiErrors.length > 0) {
            const firstError = apiErrors[0];
            const errorSummary = `Falha na linha ${firstError.line} (${firstError.header}): ${firstError.reason}`;

            toast.error(
              `⚠️ Falha na importação: ${errorSummary}. (Total: ${apiErrors.length} erros)`
            );
            console.error(
              "ERROR: Detalhes dos erros de ImportBulk:",
              apiErrors
            );
          } else {
            toast.error(`⚠️ Falha na importação: ${defaultMessage}`);
            console.error(`ERROR: Erro na chamada da API:`, error);
          }
        }
      },
      error: (error) => {
        toast.error(`Erro ao processar o arquivo: ${error.message}`);
        console.error("ERROR: Erro de PapaParse:", error);
      },
    });
  };

  const handleClickImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      console.log("LOG: Valor do input file resetado para forçar onChange.");
    }

    console.log(
      'LOG: Botão "Importar CSV" clicado. Abrindo seletor de arquivo.'
    );
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-between mt-10 flex-nowrap">
      {/* Seção de filtros */}
      <div className="flex space-x-4">
        {/* Torre */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Torre</label>
          <Select 
              onValueChange={handleTowerFilterChange}
              value={filters.tower || 'all'}
          >
            <SelectTrigger className="w-[120px] border-gray-300 bg-white cursor-pointer">
              <SelectValue
                placeholder={isLoadingFilters ? "Carregando..." : "Torre"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {filterOptions?.towers.map((tower) => (
                <SelectItem key={tower} value={tower}>
                  {tower}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pavimento */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Pavimento</label>
          <Select
            onValueChange={handleFloorFilterChange}
            value={filters.floor || 'all'}
          >
            <SelectTrigger className="w-[140px] border-gray-300 bg-white cursor-pointer">
              <SelectValue placeholder="Pavimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos</SelectItem>
              {filterOptions?.floors.map((floor) => (
                <SelectItem key={floor} value={floor}>
                  {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Classificação */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Classificação</label>
          <Select
            onValueChange={handleAcronymFilterChange}
            value={filters.acronym || 'all' }
          >
            <SelectTrigger className="w-[160px] border-gray-300 bg-white cursor-pointer">
              <SelectValue placeholder="Classificação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="M">Marcação</SelectItem>
              <SelectItem value="F">Fixação</SelectItem>
              <SelectItem value="E">Elevação</SelectItem>
            </SelectContent>
          </Select>
        </div>


        {/* Campo de busca  */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Busca Rápida</label>
          <Input
            className="w-[240px] bg-white "
            placeholder="Buscar por ID, Serviço, Tarefeiro..."
            onChange={handleTextFilterChange}
            value={filters.text || ''}
          />
        </div>
      </div>

      {/* Seção de ações */}
      <div className="space-x-2 flex items-end">
        {/* Input de arquivo Oculto */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />

        {/* Botão de Importar CSV */}
        <Button
          variant="outline"
          onClick={handleClickImport}
          className="border-gray-300 flex items-center gap-2 cursor-pointer"
        >
          <UploadCloud className="h-4 w-4" />
          Importar CSV
        </Button>

        {/* Exportar */}
        <Button
          variant="outline"
          className="border-gray-300 w-[130px] flex items-center gap-2 bg-white cursor-pointer p-0"
        >
          <Select>
            <SelectTrigger className="w-full h-10 border-none px-4">
              <SelectValue placeholder="Exportar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excel">Excel (.xlsx)</SelectItem>
              <SelectItem value="csv">CSV (.csv)</SelectItem>
              <SelectItem value="pdf">PDF (.pdf)</SelectItem>
            </SelectContent>
          </Select>
        </Button>

        {/* Novo serviço */}
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Novo Serviço
        </Button>
      </div>
    </div>
  );
};

export default FieldsServices;