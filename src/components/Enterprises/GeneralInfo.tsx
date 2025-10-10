import { Calendar, Building, Clock, Users } from "lucide-react";
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

// Dados de exemplo para o card de Andares e Conclusão
const floorsData = [
  { name: "Térreo", progress: 78, color: "bg-green-500" },
  { name: "1º Andar", progress: 62, color: "bg-green-500" },
  { name: "2º Andar", progress: 45, color: "bg-yellow-500" },
  { name: "3º Andar", progress: 23, color: "bg-orange-500" },
  { name: "4º Andar", progress: 10, color: "bg-red-500" },
];

// Dados de exemplo para a Equipe de Trabalho
const teamData = [
  { role: "Engenheiro responsável", name: "Carlos Mendes" },
  { role: "Mestre de obras", name: "João Pereira" },
  { role: "Encarregado elétrico", name: "Paulo Soares" },
  { role: "Encarregado hidráulico", name: "Marcelo Santos" },
];

export default function GeneralInfo() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto px-4">
      {/* CARD 1: Foto do Empreendimento */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Foto do Empreendimento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <img
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
            alt="Empreendimento"
            className="w-full h-64 object-cover rounded-b-xl"
          />
        </CardContent>
      </Card>

      {/* CARD 2: Informações Resumidas */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          {/* TÍTULO DA SEÇÃO COM ÍCONE */}
          <div className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Informações Resumidas
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-4 pt-0">
          {/* DETALHES EM GRID */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Item 1: Data de Início */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Data de início</span>
              </div>
              <span className="font-medium text-gray-800">15/03/2023</span>
            </div>

            {/* Item 2: Previsão de Entrega */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Previsão de entrega</span>
              </div>
              <span className="font-medium text-gray-800">28/08/2025</span>
            </div>

            {/* Item 3: Área Construída */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Building className="w-4 h-4 mr-2" />
                <span>Área construída</span>
              </div>
              <span className="font-medium text-gray-800">12.450 m²</span>
            </div>

            {/* Item 4: Status Atual */}
            <div className="flex flex-col">
              <div className="flex items-center text-gray-500 mb-1">
                <Clock className="w-4 h-4 mr-2" />
                <span>Status atual</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  Em construção
                </span>
                <Badge className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-gray-100">
                  65%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 3: Andares e Conclusão */}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          {/* TÍTULO DA SEÇÃO */}
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Andares e Conclusão
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          {/* BARRAS DE PROGRESSO */}
          <div className="space-y-4">
            {floorsData.map((floor, index) => (
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

      {/* CARD 4: Equipe de Trabalho*/}
      <Card className="shadow-md border border-gray-300">
        <CardHeader className="p-4 pb-2">
          {/* TÍTULO DA SEÇÃO */}
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-700" />
            <CardTitle className="text-md font-semibold text-gray-900">
              Equipe de Trabalho
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
              {teamData.map((member, index) => (
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
