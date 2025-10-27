// src/components/TableServices/TableServices.tsx

import "./style.css";
import { Loader2 } from 'lucide-react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion"; 
import { containerVariants, itemVariants, tableRowFadeInVariants } from "@/utils/framer-variants"; 

import { columns } from "./TableColumns";

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FooterService from "./FooterService";
import { cn } from "@/lib/utils";
import { useServices } from "@/contexts/ServicesContext";

// 🌟 Criação de componentes motion para os elementos da tabela
const MotionTbody = motion.tbody;
const MotionTr = motion.tr;

const TableServices = () => {
  const { data, isLoading, error, } = useServices(); 

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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <span className="ml-2 text-gray-600">
          Carregando serviços do empreendimento...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-600 font-medium">Erro ao carregar dados: {error} ❌</div>;
  }

  return (
    <div className="w-full max-w-full mr-4">
      <div
        className="overflow-x-auto border rounded-md mt-10 border-gray-300"
        style={{ overflowY: 'auto', scrollbarGutter: 'stable' }}>
        <Table className="w-[100%]">
          <TableHeader className={cn("bg-background sticky top-0 z-10")}>
            {table.getHeaderGroups().map((headerGroup) => (
              // Não animamos o cabeçalho
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
          
          {/* 🌟 1. Animação aplicada no corpo da tabela */}
          <MotionTbody
            variants={containerVariants} // Usamos containerVariants para o stagger
            initial="hidden"
            animate="visible"
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // 🌟 2. Animação aplicada em cada linha de dados
                <MotionTr
                  key={row.id}
                  variants={tableRowFadeInVariants} // Usamos itemVariants para a animação individual
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
                </MotionTr>
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
            
            {/* Preenchimento de linhas vazias - Não animamos essas linhas */}
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
          </MotionTbody>
        </Table>
      </div>

      <FooterService />
    </div>
  );
};

export default TableServices;