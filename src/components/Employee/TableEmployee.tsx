import "./style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type Employee = {
  id: string;
  matricula: string;
  nome: string;
  numero: string;
  funcao: string;
  acoes: string;
};

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
];

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
  ];
}

const TableEmployee = () => {
  const data = getData();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 150,
      minSize: 80,
      maxSize: 300,
    },
  });

  return (
    <div>
      <div
        className="overflow-x-auto border rounded-md bg-white shadow-sm border-gray-300 mt-6"
        style={{ maxWidth: "calc(97vw - 2rem)" }}
      >
        <Table className="w-[100%]">
          <TableHeader className={cn("bg-background sticky top-0 z-10")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50 border-gray-300"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm font-semibold whitespace-nowrap px-3 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200"
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
                  className="hover:bg-gray-100 transition-colors border-gray-300 even:bg-gray-50 odd:bg-white"
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/*Footer de paginação */}
        <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50 border-gray-300">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-medium">1–10</span> de{" "}
            <span className="font-medium">{data.length}</span> registros
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-200 text-gray-600 hover:text-black cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 bg-black text-white hover:bg-gray-800 cursor-pointer"
            >
              1
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-200 text-gray-600 hover:text-black cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableEmployee;
