import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmployeesContext } from "@/contexts/EmployeesContext";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import ViewEmployeeModal from "./ViewEmployeeModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// Tipo base da linha da tabela
type EmployeeRow = {
  id: string;
  idx: number;
  name: string;
  phone: string | null;
  role_id: string;
};

// Converte UUID em número sequencial
const formatMatricula = (idx: number, index: number) => index + 1;

// Formata número de telefone
const formatPhone = (phone: string | null) => {
  if (!phone) return "-";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7
    )}`;
  if (cleaned.length === 10)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6
    )}`;
  return phone;
};

// Converte role_id → nome do cargo
const roleMap: Record<string, string> = {
  "0cc1e385-a2b4-4b3a-b1c4-014d9d1016b5": "Encarregado",
  "7bbe6f8a-f4f6-4dcd-85ca-ca692a400942": "Administrador",
  "fa06a689-3d84-4cc5-93cd-88025e5d0bd2": "Executor",
};

const getRoleName = (role_id: string) => roleMap[role_id] ?? "—";

//  Tabela principal
const TableEmployees = () => {
  const { employees, isLoading } = useEmployeesContext();
  const [viewingEmployeeId, setViewingEmployeeId] = useState<string | null>(
    null
  );

  const handleView = (employeeId: string) => {
    setViewingEmployeeId(employeeId);
  };

  const columns: ColumnDef<EmployeeRow>[] = [
    {
      accessorKey: "idx",
      header: "Matrícula",
      cell: (info) => formatMatricula(info.row.index + 1, info.row.index),
    },
    { accessorKey: "name", header: "Nome" },
    {
      accessorKey: "phone",
      header: "Número",
      cell: (info) => formatPhone(info.getValue() as string | null),
    },
    {
      accessorKey: "role_id",
      header: "Função",
      cell: (info) => getRoleName(info.getValue() as string),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent hover:bg-transparent border border-gray-300 w-[32px] h-[32px] cursor-pointer"
                  onClick={() => handleView(row.original.id)}
                >
                  <Eye className="h-4 w-4 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Visualizar</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent hover:bg-transparent border border-gray-300 w-[32px] h-[32px] cursor-pointer"
                >
                  <Pencil className="h-4 w-4 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      <div className="overflow-x-auto border rounded-md bg-white shadow-sm border-gray-300 mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-gray-300 bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-base font-semibold whitespace-nowrap px-5 py-3 border-r border-gray-200 last:border-r-0 text-left bg-gray-200"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 transition-colors border-gray-300 even:bg-gray-50 odd:bg-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-base px-5 py-3 border-r border-gray-200 last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                  Nenhum resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer Paginação */}
        <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50 border-gray-300">
          <p className="text-base text-gray-600">
            Mostrando <span className="font-medium">1–{employees.length}</span>{" "}
            de <span className="font-medium">{employees.length}</span> registros
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon">
              1
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ViewEmployeeModal
        employeeId={viewingEmployeeId}
        onClose={() => setViewingEmployeeId(null)}
      />
    </>
  );
};

export default TableEmployees;
