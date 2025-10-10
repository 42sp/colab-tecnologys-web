import {
  Plus,
  Upload,
  Download,
  Filter,
  Home,
  MapPin,
  Hash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function FloorsAndQuantities() {
  const enterpriseInfo = {
    name: "Residencial Parque das Flores",
    id: "EMP-2023-456",
    location: "Av. Paulista, 1000 - São Paulo, SP",
  };

  const tableData = [
    {
      floor: "Térreo",
      mdo: [64, 96, 66, 42, 81, 273],
      matCer: [0, 8, 60, 16, 7, 7],
      matConc: [54, 4, 22, 15, 19, 7],
      func: [2, 3, 4, 2, 7, 7],
      mrc: [4, 2, 7, 7, 6, 4],
      mdoPEx: [4, 2],
    },
    {
      floor: "1º Andar",
      mdo: [25, 63, 2, 47, 84, 220],
      matCer: [10, 75, 53, 98, 26, 61],
      matConc: [77, 38, 53, 75, 4, 0],
      func: [8, 5, 8, 9, 5, 7],
      mrc: [3, 9, 5, 7, 7, 3],
      mdoPEx: [3, 9],
    },
    {
      floor: "2º Andar",
      mdo: [90, 99, 3, 23, 20, 330],
      matCer: [33, 16, 1, 83, 71, 72],
      matConc: [55, 66, 23, 18, 13, 3],
      func: [1, 7, 8, 2, 6, 9],
      mrc: [5, 8, 2, 6, 9, 0],
      mdoPEx: [5, 8],
    },
    {
      floor: "3º Andar",
      mdo: [48, 3, 53, 46, 93, 246],
      matCer: [73, 17, 57, 21, 74, 58],
      matConc: [72, 73, 27, 82, 42, 4],
      func: [8, 2, 0, 8, 8, 0],
      mrc: [7, 9, 8, 8, 0, 4],
      mdoPEx: [7, 9],
    },
    {
      floor: "4º Andar",
      mdo: [79, 88, 16, 5, 4, 160],
      matCer: [21, 87, 70, 98, 2, 46],
      matConc: [71, 27, 91, 84, 35, 5],
      func: [1, 5, 4, 0, 5, 6],
      mrc: [4, 1, 5, 6, 2, 4],
      mdoPEx: [4, 1],
    },
  ];

  const mdoCols = ["7 cm", "9 cm", "11.5 cm", "14 cm", "19 cm", "Total"];
  const matCerCols = ["C1", "C2", "C3", "C4", "C5", "C6"];
  const matConcCols = ["C1", "C2", "C3", "C4", "C5", "C6"];
  const funcCols = ["F1", "F2", "F3", "F4", "F5", "F6"];
  const mrcCols = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const mdoPExCols = ["P1", "P2"];

  const renderCells = (dataArray: number[]) =>
    (dataArray || []).map((value, idx) => (
      <TableCell
        key={idx}
        className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300 last:border-r-0"
      >
        {value}
      </TableCell>
    ));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* HEADER DE INFORMAÇÕES */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="flex divide-x divide-gray-200 p-4">
          <div className="flex flex-col pr-4 w-1/3">
            <span className="text-xs font-medium text-gray-500 mb-1">
              Nome do Empreendimento
            </span>
            <div className="flex items-center text-gray-900 font-semibold text-base">
              <Home className="w-4 h-4 mr-1 text-gray-500" />
              {enterpriseInfo.name}
            </div>
          </div>
          <div className="flex flex-col px-4 w-1/3">
            <span className="text-xs font-medium text-gray-500 mb-1">
              ID do Empreendimento
            </span>
            <div className="flex items-center text-gray-900 font-semibold text-base">
              <Hash className="w-4 h-4 mr-1 text-gray-500" />
              {enterpriseInfo.id}
            </div>
          </div>
          <div className="flex flex-col pl-4 w-1/3">
            <span className="text-xs font-medium text-gray-500 mb-1">
              Localização
            </span>
            <div className="flex items-center text-gray-900 font-semibold text-base">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              {enterpriseInfo.location}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOTÕES DE AÇÃO */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <Button className="bg-green-600 hover:bg-green-700 shadow-md text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-1" /> Adicionar Andar
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-1" /> Importar Dados
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-4 h-4 mr-1" /> Exportar
          </Button>
        </div>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <Filter className="w-4 h-4 mr-1" /> Filtrar
        </Button>
      </div>

      <Separator />

      {/* TABELA */}
      <Card className="border border-gray-300 shadow-xl overflow-x-auto">
        <Table className="min-w-full text-center">
          <TableHeader className="bg-gray-800 text-white">
            <TableRow>
              <TableHead
                rowSpan={2}
                className="px-4 py-3 text-left font-bold text-sm border-r border-gray-600 sticky left-0 bg-gray-800 w-28 text-white"
              >
                Andar
              </TableHead>
              <TableHead
                colSpan={mdoCols.length}
                className="px-4 py-2 font-bold text-xs border-r border-gray-600 text-white"
              >
                QUANTIDADES MDO
              </TableHead>
              <TableHead
                colSpan={matCerCols.length}
                className="px-4 py-2 font-bold text-xs border-r border-gray-600 text-white"
              >
                QUANTIDADES MAT CER
              </TableHead>
              <TableHead
                colSpan={matConcCols.length}
                className="px-4 py-2 font-bold text-xs border-r border-gray-600 text-white"
              >
                QUANTIDADES MAT CONC
              </TableHead>
              <TableHead
                colSpan={funcCols.length}
                className="px-4 py-2 font-bold text-xs border-r border-gray-600 text-white"
              >
                QUANTIDADES FUNCIONÁRIO
              </TableHead>
              <TableHead
                colSpan={mrcCols.length}
                className="px-4 py-2 font-bold text-xs border-r border-gray-600 text-white"
              >
                FUNCIONÁRIO - MRC
              </TableHead>
              <TableHead
                colSpan={mdoPExCols.length}
                className="px-4 py-2 font-bold text-xs text-white"
              >
                QUANTIDADES MDO P/ EXECUÇÃO
              </TableHead>
            </TableRow>

            <TableRow className="bg-gray-900 text-gray-300">
              {[
                ...mdoCols,
                ...matCerCols,
                ...matConcCols,
                ...funcCols,
                ...mrcCols,
                ...mdoPExCols,
              ].map((header, index) => (
                <TableHead
                  key={index}
                  className="px-3 py-1 font-medium text-xs border-r border-gray-700 last:border-r-0 text-white"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-yellow-50/50">
                <TableCell className="px-4 py-3 text-left whitespace-nowrap text-sm font-semibold text-gray-800 bg-gray-50 border-r border-gray-300 sticky left-0 w-28">
                  {row.floor}
                </TableCell>
                {renderCells(row.mdo)}
                {renderCells(row.matCer)}
                {renderCells(row.matConc)}
                {renderCells(row.func)}
                {renderCells(row.mrc)}
                {renderCells(row.mdoPEx)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
