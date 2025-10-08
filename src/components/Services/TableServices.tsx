import './style.css';
import BreadcrumbService from './BreadcrumbService';
import FieldsServices from './FieldsServices';

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

export type Services = {
  idServico: string
  torre: string
  nPav: string
  pav: string
  apartamento: string
  classificacao: string
  servico: string
  servicoEmContrato: string
  parecerDesvio: string
  espessura: string
  quantMco: number
  quantMat: number
  quantFunc: number
  bonus: string
  unidadeMedida: string
  unidadeMaterial: string
  ativo: boolean
  dataRealizacaoServico: string
  dataLancamento: string
  porcentagem: number
  tarifario: string
  codigoMatricula: string
}

export const columns: ColumnDef<Services>[] = [
  {
    accessorKey: "idServico",
    header: "ID SERVIÇO",
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "torre",
    header: "TORRE",
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "nPav",
    header: "Nº PAV",
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "pav",
    header: "PAV",
    size: 70,
    minSize: 50,
    maxSize: 90,
  },
  {
    accessorKey: "apartamento",
    header: "APARTAMENTO",
    size: 120,
    minSize: 90,
    maxSize: 150,
  },
  {
    accessorKey: "classificacao",
    header: "CLASSIFICAÇÃO",
    size: 130,
    minSize: 100,
    maxSize: 160,
  },
  {
    accessorKey: "servico",
    header: "SERVIÇO",
    size: 150,
    minSize: 120,
    maxSize: 200,
  },
  {
    accessorKey: "servicoEmContrato",
    header: "SERVIÇO EM CONTRATO",
    size: 160,
    minSize: 140,
    maxSize: 200,
  },
  {
    accessorKey: "parecerDesvio",
    header: "PARECER/DESVIO",
    size: 140,
    minSize: 120,
    maxSize: 180,
  },
  {
    accessorKey: "espessura",
    header: "ESPESSURA",
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "quantMco",
    header: "Quant MCO",
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "quantMat",
    header: "Quant MAT",
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "quantFunc",
    header: "Quant FUNC",
    size: 110,
    minSize: 90,
    maxSize: 130,
  },
  {
    accessorKey: "bonus",
    header: "BÔNUS",
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "unidadeMedida",
    header: "UNIDADE MEDIDA",
    size: 130,
    minSize: 110,
    maxSize: 160,
  },
  {
    accessorKey: "unidadeMaterial",
    header: "UNIDADE MATERIAL",
    size: 140,
    minSize: 120,
    maxSize: 170,
  },
  {
    accessorKey: "ativo",
    header: "ATIVO",
    size: 80,
    minSize: 60,
    maxSize: 100,
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap inline-block ${
        row.getValue("ativo") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        {row.getValue("ativo") ? "Sim" : "Não"}
      </span>
    ),
  },
  {
    accessorKey: "dataRealizacaoServico",
    header: "DATA REALIZAÇÃO SERVIÇO",
    size: 180,
    minSize: 160,
    maxSize: 220,
  },
  {
    accessorKey: "dataLancamento",
    header: "DATA LANÇAMENTO",
    size: 140,
    minSize: 120,
    maxSize: 170,
  },
  {
    accessorKey: "porcentagem",
    header: "PORCENTAGEM",
    size: 120,
    minSize: 100,
    maxSize: 140,
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.getValue("porcentagem")}%</span>
    ),
  },
  {
    accessorKey: "tarifario",
    header: "TARIFÁRIO",
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "codigoMatricula",
    header: "CÓDIGO MATRÍCULA",
    size: 140,
    minSize: 120,
    maxSize: 170,
  },
]

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FooterService from './FooterService';
import { cn } from '@/lib/utils';

function getData(): Services[] {
  return [
    {
      idServico: "SRV001",
      torre: "T1",
      nPav: "5",
      pav: "1º",
      apartamento: "101",
      classificacao: "A",
      servico: "Instalação Elétrica",
      servicoEmContrato: "Sim",
      parecerDesvio: "Aprovado",
      espessura: "10mm",
      quantMco: 5,
      quantMat: 10,
      quantFunc: 2,
      bonus: "10%",
      unidadeMedida: "m²",
      unidadeMaterial: "kg",
      ativo: true,
      dataRealizacaoServico: "2024-01-15",
      dataLancamento: "2024-01-10",
      porcentagem: 85,
      tarifario: "T001",
      codigoMatricula: "MAT123",
    },
    {
      idServico: "SRV002",
      torre: "T2",
      nPav: "8",
      pav: "2º",
      apartamento: "202",
      classificacao: "B",
      servico: "Pintura",
      servicoEmContrato: "Não",
      parecerDesvio: "Pendente",
      espessura: "5mm",
      quantMco: 3,
      quantMat: 8,
      quantFunc: 1,
      bonus: "5%",
      unidadeMedida: "m²",
      unidadeMaterial: "L",
      ativo: true,
      dataRealizacaoServico: "2024-01-20",
      dataLancamento: "2024-01-18",
      porcentagem: 92,
      tarifario: "T002",
      codigoMatricula: "MAT456",
    },
    // ...
  ]
}

const TableServices = () => {
	const data = getData();

	const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 150,
      minSize: 80,
      maxSize: 300,
    },
  })

	return (
		<div className='w-full max-w-full'>
			<BreadcrumbService />
			<FieldsServices />

			<div className="overflow-x-auto border rounded-xs mt-10 mx-4" style={{ maxWidth: 'calc(97vw - 2rem)' }}>
				<Table className="w-[100%]">
					<TableHeader className={cn("bg-background sticky top-0 z-10", )}>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="text-xs font-semibold whitespace-nowrap px-3 py-3 border-r border-gray-200 last:border-r-0 text-left"
										style={{
											width: `${header.getSize()}px`,
											minWidth: `${header.column.columnDef.minSize || 80}px`,
											maxWidth: `${header.column.columnDef.maxSize || 300}px`
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
									className="hover:bg-gray-50 transition-colors"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="text-xs px-3 py-3 border-r border-gray-200 last:border-r-0"
											style={{
												width: `${cell.column.getSize()}px`,
												minWidth: `${cell.column.columnDef.minSize || 80}px`,
												maxWidth: `${cell.column.columnDef.maxSize || 300}px`
											}}
										>
											<div className="truncate">
												{
													flexRender(cell.column.columnDef.cell, cell.getContext())
												}
											</div>
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<FooterService />
		</div>
	);
}

export default TableServices;