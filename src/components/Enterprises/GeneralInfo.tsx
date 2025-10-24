// src/components/Enterprises/GeneralInfo.tsx

import { Calendar, Building, Clock, Users, Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { Construction } from "@/types/construction.types";
import { constructionService } from "@/services/constructionService"; // Certifique-se que o caminho esteja correto

// Dados de exemplo (mantidos como mock para visualização, mas no futuro devem vir da API)
const floorsDataMock = [
  { name: "Térreo", progress: 78, color: "bg-green-500" },
  { name: "1º Andar", progress: 62, color: "bg-green-500" },
  { name: "2º Andar", progress: 45, color: "bg-yellow-500" },
  { name: "3º Andar", progress: 23, color: "bg-orange-500" },
  { name: "4º Andar", progress: 10, color: "bg-red-500" },
];

const teamDataMock = [
  { role: "Engenheiro responsável", name: "Carlos Mendes" },
  { role: "Mestre de obras", name: "João Pereira" },
  { role: "Encarregado elétrico", name: "Paulo Soares" },
  { role: "Encarregado hidráulico", name: "Marcelo Santos" },
];

// Função auxiliar para formatação de data
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Não Informado";
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return "Data Inválida";
  }
};

const getStatusDisplay = (construction?: Construction | null) => {
    if (!construction) return { text: "Carregando...", badge: "bg-gray-400 text-gray-800" };
    
    // Lógica simples de status (melhorar com base em 'status' ou lógica mais complexa se houver)
    if (construction.finished_at) return { text: "Concluído", badge: "bg-green-100 text-green-700" };

    const expectedEnd = construction.expected_end_date ? new Date(construction.expected_end_date) : null;
    const now = new Date();
    
    // Se a data final esperada for passada e não estiver concluído
    if (expectedEnd && expectedEnd < now) {
        return { text: "Atrasado", badge: "bg-red-100 text-red-700" };
    }

    return { text: "Em Andamento", badge: "bg-blue-100 text-blue-700" };
};


export default function GeneralInfo() {
  const { workId } = useParams<{ workId: string }>();
  const [construction, setConstruction] = useState<Construction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConstruction = useCallback(async (constructionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await constructionService.get(constructionId);
      setConstruction(data);
    } catch (err) {
      console.error("Erro ao buscar construção:", err);
      setError((err as any)?.message || "Falha ao carregar os detalhes do empreendimento.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (workId) {
      fetchConstruction(workId);
    } else {
      setIsLoading(false);
      setError("ID do empreendimento não fornecido na URL.");
    }
  }, [workId, fetchConstruction]);

  const statusDisplay = getStatusDisplay(construction);
  // Simulação de progresso total, pois a API Construction não fornece o progresso (%) diretamente
  const totalProgress = construction?.finished_at ? 100 : 65; 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando detalhes do empreendimento...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">❌ {error}</p>
        {/* Adicionar botão de recarregar se necessário, ou link para a lista */}
      </div>
    );
  }

  if (!construction) {
    return <div className="text-center p-8 text-gray-500">Empreendimento não encontrado.</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-4">
      
      {/* CARD 1: Foto do Empreendimento (Mantido mock) */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {construction.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <img
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" // Mock Image
            alt={`Empreendimento ${construction.name}`}
            className="w-full h-64 object-cover rounded-b-xl"
          />
        </CardContent>
      </Card>

      {/* CARD 2: Informações Resumidas (Consumindo dados da API) */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Informações Resumidas
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-4 pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Item 1: Data de Início */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Data de início</span>
              </div>
              <span className="font-medium text-gray-800">{formatDate(construction.start_date)}</span>
            </div>

            {/* Item 2: Previsão de Entrega */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Previsão de entrega</span>
              </div>
              <span className="font-medium text-gray-800">{formatDate(construction.expected_end_date)}</span>
            </div>

            {/* Item 3: Endereço (Mudança: Endereço completo) */}
            <div className="flex flex-col col-span-2">
              <div className="flex items-center text-gray-500 mb-1">
                <Building className="w-4 h-4 mr-2" />
                <span>Endereço</span>
              </div>
              <span className="font-medium text-gray-800">
                {construction.address}, {construction.city} - {construction.state}
              </span>
            </div>

            {/* Item 4: Status Atual */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Clock className="w-4 h-4 mr-2" />
                <span>Status atual</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  {statusDisplay.text}
                </span>
                <Badge className={`${statusDisplay.badge} text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-gray-100`}>
                  {totalProgress}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 3: Andares e Conclusão (Mantido mock, pois a API não fornece esses dados) */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Andares e Conclusão (Mock Data)
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="space-y-4">
            {floorsDataMock.map((floor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1 text-sm text-gray-900">
                  <span>{floor.name}</span>
                  <span>{floor.progress}%</span>
                </div>
                <Progress
                  value={floor.progress}
                  className={`h-2 [&>div]:${floor.color}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CARD 4: Equipe de Trabalho (Mantido mock, pois a API não fornece esses dados) */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Equipe de Trabalho (Mock Data)
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-7">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 hover:bg-white">
                <TableHead className="text-gray-500 text-left w-1/2">
                  Cargo
                </TableHead>
                <TableHead className="text-gray-500 text-left w-1/2">
                  Nome
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamDataMock.map((member, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-700 w-1/2 py-3">
                    {member.role}
                  </TableCell>
                  <TableCell className="text-gray-900 w-1/2 py-3">
                    {member.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}