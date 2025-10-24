// src/components/TableServices/TableServices.tsx

import "./style.css";
import FieldsServices from "./FieldsServices";
import { useEffect, useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Type que define as colunas de EXIBIÇÃO da Tabela
export type Services = {
  id: string; // ID do Serviço (M-2637259)
  torre: string;
  pav: string; // Andar/Floor
  apartamento: string;
  unidadeMedida: string; // measurement_unit
  parede: string; // stage/wall
  espessura: string;
  marcacao: number; // labor_quantity onde service_description é 'Marcação'
  fixacao: number; // labor_quantity onde service_description é 'Fixação'
  elevacao: number; // labor_quantity onde service_description é 'Elevação'
  quantMat: number; // material_quantity
  quantMod: number; // worker_quantity (QTO MOD = Quantidade Modelo/Mão de Obra)
};

// Nova definição de colunas, focada nos campos de medição solicitados
export const columns: ColumnDef<Services>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "torre",
    header: "TORRE",
    size: 80,
    minSize: 60,
  },
  {
    accessorKey: "pav",
    header: "PAV",
    size: 70,
    minSize: 50,
  },
  {
    accessorKey: "apartamento",
    header: "APTO",
    size: 120,
    minSize: 90,
  },
  {
    accessorKey: "unidadeMedida",
    header: "UNIDADE DE MEDIÇÃO",
    size: 130,
    minSize: 110,
  },
  {
    accessorKey: "parede",
    header: "PAREDE",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "espessura",
    header: "ESPESSURA",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "marcacao",
    header: "MARCAÇÃO (M)",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "fixacao",
    header: "FIXAÇÃO (M)",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "elevacao",
    header: "ELEVAÇÃO (M²)",
    size: 110,
    minSize: 90,
  },
  {
    accessorKey: "quantMat",
    header: "QTO MAT (m²)",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "quantMod",
    header: "QTO MOD (m²)",
    size: 100,
    minSize: 80,
  },
];

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FooterService from "./FooterService";
import { cn } from "@/lib/utils";
import { useServices } from "@/contexts/ServicesContext";


const TableServices = () => {
  // Pega os dados do contexto
  const { data, isLoading, error } = useServices(); 

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 150,
      minSize: 80,
      maxSize: 300,
    },
  });
  
  if (isLoading) {
    return <div className="p-10 text-center text-xl font-medium">Carregando serviços... ⏳</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600 font-medium">Erro ao carregar dados: {error} ❌</div>;
  }

  return (
    <div className="w-full max-w-full">
      <FieldsServices />

      <div
        className="overflow-x-auto border rounded-md mt-10 border-gray-300"
        style={{ maxWidth: "calc(97vw - 2rem)" }}
      >
        <Table className="w-[100%]">
          <TableHeader className={cn("bg-background sticky top-0 z-10")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm font-semibold whitespace-nowrap px-3 py-3 border-r  last:border-r-0 text-left border-b border-gray-300"
                    style={{
                      width: `${header.getSize()}px`,
                      minWidth: `${header.column.columnDef.minSize || 80}px`,
                      maxWidth: `${header.column.columnDef.maxSize || 300}px`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 transition-colors border-gray-300 even:bg-gray-50 odd:bg-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm px-3 py-3 border-r border-gray-200 last:border-r-0"
                      style={{
                        width: `${cell.column.getSize()}px`,
                        minWidth: `${cell.column.columnDef.minSize || 80}px`,
                        maxWidth: `${cell.column.columnDef.maxSize || 300}px`,
                      }}
                    >
                      <div className="truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum serviço encontrado para esta construção.
                </TableCell>
              </TableRow>
            )}
            
            {/* Preenchimento de linhas vazias */}
            {Array.from({
              length: Math.max(0, 10 - table.getRowModel().rows.length),
            }).map((_, rowIndex) => (
              <TableRow
                key={`empty-${rowIndex}`}
                className="even:bg-gray-50 odd:bg-white border-gray-300"
              >
                {table.getHeaderGroups()[0].headers.map((header, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="text-sm px-3 py-3 border-r border-gray-200 last:border-r-0"
                    style={{
                      width: `${header.getSize()}px`,
                      minWidth: `${header.column.columnDef.minSize || 80}px`,
                      maxWidth: `${header.column.columnDef.maxSize || 300}px`,
                    }}
                  >
                    <span className="text-gray-300">—</span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FooterService />
    </div>
  );
};

export default TableServices;