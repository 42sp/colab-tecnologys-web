// src/components/TableServices/columns.tsx

import type { ColumnDef } from "@tanstack/react-table";

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

// Função auxiliar para renderizar 0 como traço
const formatZeroToDash = (value: number) => (value === 0 ? "-" : value.toString());

// Definição de colunas da tabela de serviços
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
    cell: ({ getValue }) => formatZeroToDash(getValue() as number),
  },
  {
    accessorKey: "fixacao",
    header: "FIXAÇÃO (M)",
    size: 100,
    minSize: 80,
    cell: ({ getValue }) => formatZeroToDash(getValue() as number),
  },
  {
    accessorKey: "elevacao",
    header: "ELEVAÇÃO (M²)",
    size: 110,
    minSize: 90,
    cell: ({ getValue }) => formatZeroToDash(getValue() as number),
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