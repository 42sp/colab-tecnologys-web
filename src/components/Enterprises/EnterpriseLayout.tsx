// src/components/Enterprises/EnterpriseLayout.tsx

import { NavLink, Outlet, useParams } from "react-router-dom";
import { EnterpriseBreadcrumb } from "./EnterpriseBreadcrumb"; // Importa o novo Breadcrumb
import { useEffect, useState } from "react";
import { constructionService } from "@/services/constructionService"; // Service de busca
import { Loader2 } from "lucide-react";

export default function EnterpriseLayout() {
  const { workId } = useParams<{ workId: string }>();
  const [constructionName, setConstructionName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar o nome da construção
  useEffect(() => {
    if (workId) {
      const fetchName = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Busca apenas a informação essencial (o ideal seria ter um endpoint /constructions/:id/name)
          const data = await constructionService.get(workId); 
          setConstructionName(data.name);
        } catch (err) {
          console.error("Erro ao buscar o nome da construção:", err);
          setError("Não foi possível carregar o nome.");
          setConstructionName("Empreendimento Desconhecido");
        } finally {
          setIsLoading(false);
        }
      };
      fetchName();
    }
  }, [workId]);

  if (!workId) {
    // Se não há ID na rota (o que não deve acontecer se a navegação estiver correta)
    return <div className="p-8 text-center text-red-500">Erro: ID do empreendimento ausente.</div>;
  }
  
  // Exibição de Erro ou Loading (Opcional, mas útil)
  if (error && !constructionName) {
     return <div className="p-8 text-center text-red-500">Falha ao carregar detalhes: {error}</div>;
  }

  // Título dinâmico
  // const titleText = constructionName 
  //   ? `Empreendimento: ${constructionName}` 
  //   : (isLoading ? "Carregando..." : "Edição de Empreendimento");

  return (
    <div>
      <div className="mt-5 ml-5">
        {/* Passa o nome e status de loading para o Breadcrumb */}
        <EnterpriseBreadcrumb constructionName={constructionName} isLoading={isLoading} />

        <h1 className="font-bold text-3xl my-5 text-gray-900">
            Empreendimento
            {/* {isLoading && <Loader2 className="w-6 h-6 ml-3 inline-block animate-spin text-gray-500" />} */}
        </h1>
      </div>

      <div className="flex justify-center gap-6 border-b border-t border-gray-300  bg-gray-200 w-full">
        {/* Informações Gerais (Rota index ou /info) */}
        <NavLink
          to={`/empreendimentos/${workId}/info`}
          className={({ isActive, isPending }) =>
            (isActive || location.pathname === `/empreendimentos/${workId}`) 
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Informações Gerais
        </NavLink>

        {/* Serviços */}
        <NavLink
          to="servicos"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Serviços
        </NavLink>

        {/* Andares e Quantitativos */}
        <NavLink
          to="andares"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2 "
          }
        >
          Andares e Quantitativos
        </NavLink>

        {/* Documentos */}
        <NavLink
          to="documentos"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Documentos
        </NavLink>

        {/* Histórico */}
        <NavLink
          to="historico"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Histórico
        </NavLink>
      </div>

      {/* Conteúdo da aba */}
      <Outlet />
    </div>
  );
}