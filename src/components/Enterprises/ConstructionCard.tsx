// src/components/Enterprises/ConstructionCard.tsx

import type { Construction } from "@/types/construction.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom"; 

interface ConstructionCardProps {
  construction: Construction;
}

const getStatusBadge = (status?: string) => {
  const baseStyle = "text-xs font-semibold px-2.5 py-0.5 rounded-full";
  switch (status) {
    case "Em Andamento":
      return <Badge className={`bg-blue-100 text-blue-700 hover:bg-blue-100 ${baseStyle}`}>Em Andamento</Badge>;
    case "Atrasado":
      return <Badge className={`bg-red-100 text-red-700 hover:bg-red-100 ${baseStyle}`}>Atrasado</Badge>;
    case "Concluído":
      return <Badge className={`bg-green-100 text-green-700 hover:bg-green-100 ${baseStyle}`}>Concluído</Badge>;
    default:
      return <Badge className={`bg-gray-100 text-gray-700 hover:bg-gray-100 ${baseStyle}`}>Pendente</Badge>;
  }
};

export function ConstructionCard({ construction }: ConstructionCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navega para a rota de layout de detalhes, que tem o Outlet, e o 'info' será o default.
    // Rota: /empreendimentos/:id/info
    navigate(`/empreendimentos/${construction.id}/info`);
  };

  const status = construction.finished_at ? "Concluído" : "Em Andamento"; // Lógica simples de status

  const startDate = construction.start_date ? new Date(construction.start_date).toLocaleDateString() : 'N/A';
  const expectedEndDate = construction.expected_end_date ? new Date(construction.expected_end_date).toLocaleDateString() : 'N/A';

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 truncate">
          {construction.name}
        </CardTitle>
        {getStatusBadge(status)}
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2 text-sm text-gray-600">
        {/* Localização */}
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          <span className="truncate">{construction.address}, {construction.city} - {construction.state}</span>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium text-gray-800">Início:</span> 
            <span className="ml-1">{startDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium text-gray-800">Previsão:</span>
            <span className="ml-1">{expectedEndDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}