import React from "react";

// Esqueleto para a barra de filtros/busca
const FieldsEmployeeSkeleton: React.FC = () => (
  <div className="flex justify-between w-full my-10 animate-pulse">
    <div className="flex gap-5">
      {/* Input de Busca */}
      <div className="h-10 bg-gray-200 rounded-md w-[300px]"></div>
      {/* Botão de Filtros */}
      <div className="h-10 bg-gray-200 rounded-md w-[100px]"></div>
    </div>
    {/* Botão Adicionar Funcionário */}
    <div className="h-10 bg-gray-900 rounded-md w-[200px]"></div>
  </div>
);

// Esqueleto para uma linha da tabela de funcionários
const TableEmployeeRowSkeleton: React.FC = () => (
  <TableRow className="animate-pulse border-gray-300 even:bg-gray-50 odd:bg-white">
    <TableCell className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0">
      <div className="h-4 bg-gray-200 rounded w-16"></div> {/* Matrícula */}
    </TableCell>
    <TableCell className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0">
      <div className="h-4 bg-gray-200 rounded w-48"></div> {/* Nome */}
    </TableCell>
    <TableCell className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0">
      <div className="h-4 bg-gray-200 rounded w-32"></div> {/* Número */}
    </TableCell>
    <TableCell className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0">
      <div className="h-4 bg-gray-200 rounded w-24"></div> {/* Função */}
    </TableCell>
    <TableCell className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0">
      <div className="flex justify-center gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
        {/* Botão Olho */}
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
        {/* Botão Lápis */}
      </div>
    </TableCell>
  </TableRow>
);

// Componente principal do esqueleto para a página de Funcionários
const EmployeesPageSkeleton: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {" "}
      {/* Ajuste o padding conforme necessário para sua página */}
      {/* Esqueleto dos Campos de Filtro */}
      <FieldsEmployeeSkeleton />
      {/* Esqueleto da Tabela de Funcionários */}
      <div className="overflow-x-auto border rounded-md bg-white shadow-sm border-gray-300">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-300 bg-gray-100 animate-pulse">
              <TableHead className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>{" "}
                {/* Cabeçalho Matrícula */}
              </TableHead>
              <TableHead className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/2"></div>{" "}
                {/* Cabeçalho Nome */}
              </TableHead>
              <TableHead className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>{" "}
                {/* Cabeçalho Número */}
              </TableHead>
              <TableHead className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>{" "}
                {/* Cabeçalho Função */}
              </TableHead>
              <TableHead className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/5"></div>{" "}
                {/* Cabeçalho Ações */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map(
              (
                _,
                index // 5 linhas de esqueleto
              ) => (
                <TableEmployeeRowSkeleton key={index} />
              )
            )}
          </TableBody>
        </Table>

        {/* Footer de Paginação Skeleton */}
        <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50 border-gray-300 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
            <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-10 animate-pulse">
        Aguarde, carregando informações... {" "}
      </p>
    </div>
  );
};

export default EmployeesPageSkeleton;

// Você precisará importar os componentes Table, TableHeader, TableBody, TableRow, TableHead, TableCell
// do seu "@/components/ui/table" para este arquivo, se ainda não o fez.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
