import './style.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"

export type Employee = {
	id: string
	matricula: string
	nome: string
	numero: string
	funcao: string
	acoes: string
}

export const columns: ColumnDef<Employee>[] = [
	{
		accessorKey: "id",
		header: "ID",
		size: 100,
		minSize: 80,
		maxSize: 120,
		enableHiding: true,
	},
	{
		accessorKey: "matricula",
		header: "Matricula",
		size: 80,
		minSize: 60,
		maxSize: 100,
	},
	{
		accessorKey: "nome",
		header: "Nome",
		size: 80,
		minSize: 60,
		maxSize: 100,
	},
	{
		accessorKey: "funcao",
		header: "Função",
		size: 70,
		minSize: 50,
		maxSize: 90,
	},
	{
		accessorKey: "acoes",
		header: "Ações",
		size: 120,
		minSize: 90,
		maxSize: 150,
	},
]

function getData(): Employee[] {
	return [
		{
			id: "1",
			matricula: "F001",
			nome: "Ana Silva",
			numero: "(11) 99999-9999",
			funcao: "Pedreiro",
			acoes: "",
		},
		{
			id: "2",
			matricula: "F002",
			nome: "Carlos Oliveira",
			numero: "(21) 98888-8888",
			funcao: "Pedreiro",
			acoes: "",
		},
	]
}

const TableEmployee = () => {
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
		<div>
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
		</div>
	);
}

export default TableEmployee;