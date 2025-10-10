import { History as HistoryIcon, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  const historyData = [
    {
      date: "22/05/2023",
      time: "14:32",
      type: "Upload",
      document: "Planta Baixa Térreo.pdf",
      user: "Carlos Mendes",
      details: "Arquivo adicionado ao empreendimento Vila Nova",
      color: "bg-green-100 text-green-700",
    },
    {
      date: "20/05/2023",
      time: "09:45",
      type: "Visualização",
      document: "Contrato Empreiteira XYZ.pdf",
      user: "Rodrigo Silva",
      details: "Documento acessado pelo usuário",
      color: "bg-blue-100 text-blue-700",
    },
    {
      date: "18/05/2023",
      time: "16:20",
      type: "Download",
      document: "Orçamento Atualizado.xlsx",
      user: "Paulo Soares",
      details: "Arquivo baixado pelo usuário",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      date: "15/05/2023",
      time: "11:07",
      type: "Edição",
      document: "Orçamento Atualizado.xlsx",
      user: "Carlos Mendes",
      details: "Atualização de valores na planilha",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      date: "14/05/2023",
      time: "17:23",
      type: "Exclusão",
      document: "Cronograma Preliminar.pdf",
      user: "João Pereira",
      details: "Arquivo removido por solicitação do gerente",
      color: "bg-red-100 text-red-700",
    },
    {
      date: "12/05/2023",
      time: "14:32",
      type: "Upload",
      document: "Laudo Técnico Fundação.pdf",
      user: "Paulo Soares",
      details: "Arquivo adicionado ao empreendimento Vila Nova",
      color: "bg-green-100 text-green-700",
    },
    {
      date: "10/05/2023",
      time: "10:15",
      type: "Visualização",
      document: "Licença Ambiental.pdf",
      user: "Rodrigo Silva",
      details: "Documento acessado pelo usuário",
      color: "bg-blue-100 text-blue-700",
    },
    {
      date: "05/05/2023",
      time: "09:42",
      type: "Upload",
      document: "Fotos da Obra - Março 2023",
      user: "João Pereira",
      details: "Pasta com 24 imagens adicionada ao sistema",
      color: "bg-green-100 text-green-700",
    },
  ];

  const TypeBadge = ({ type, colorClass }) => (
    <span
      className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${colorClass}`}
    >
      {type}
    </span>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* HEADER DA PÁGINA: Título, Filtro de Tempo e Busca */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <HistoryIcon className="w-6 h-6 mr-3 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Histórico de Atividades
          </h2>
        </div>

        {/* Filtros e Busca */}
        <div className="flex items-center space-x-4">
          {/* Filtro de Tempo: */}
          <Select defaultValue="7days">
            <SelectTrigger className="w-[160px] border-gray-300 text-sm font-medium cursor-pointer">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="all">Desde o início</SelectItem>
            </SelectContent>
          </Select>

          {/* Busca: */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Buscar atividade"
              className="pl-10 pr-4 py-2 w-48 text-sm border-gray-300"
            />
          </div>
        </div>
      </header>

      {/* TABELA DE HISTÓRICO: */}
      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-white">
            <TableRow className="border-b-0 hover:bg-white">
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Data e Hora
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Tipo de Ação
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Documento
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Usuário
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">
                Detalhes
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {historyData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                {/* Data e Hora */}
                <TableCell className="px-6 py-3 whitespace-nowrap border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-900">
                    {item.date}
                  </div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </TableCell>

                {/* Tipo de Ação */}
                <TableCell className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                  <TypeBadge type={item.type} colorClass={item.color} />
                </TableCell>

                {/* Documento */}
                <TableCell className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 font-medium border-b border-gray-200">
                  {item.document}
                </TableCell>

                {/* Usuário */}
                <TableCell className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200">
                  {item.user}
                </TableCell>

                {/* Detalhes */}
                <TableCell className="px-6 py-3 text-sm text-gray-500 border-b border-gray-200">
                  {item.details}
                </TableCell>

                {/* Ações (Ícone de Informação) */}
                <TableCell className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* RODAPÉ: Contagem de Registros e Paginação */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Exibindo 8 de 82 registros de atividades</span>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="px-3 py-1 text-gray-700 hover:bg-gray-50 h-8"
          >
            Anterior
          </Button>
          <Button
            className="px-3 py-1 bg-gray-900 text-white font-semibold hover:bg-gray-800 h-8"
            style={{ backgroundColor: "#1f2937" }}
          >
            1
          </Button>
          <Button
            variant="outline"
            className="px-3 py-1 text-gray-700 hover:bg-gray-50 h-8"
          >
            2
          </Button>
          <Button
            variant="outline"
            className="px-3 py-1 text-gray-700 hover:bg-gray-50 h-8"
          >
            3
          </Button>
          <Button
            variant="outline"
            className="px-3 py-1 text-gray-700 hover:bg-gray-50 h-8"
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
