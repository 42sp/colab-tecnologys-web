import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Button } from "../ui/button";
import { useEmployeesContext } from "@/contexts/EmployeesContext";
import CreateEmployeeModal from "./CreateEmployeeModal";

const jobRoles = [
  { value: "0cc1e385-a2b4-4b3a-b1c4-014d9d1016b5", label: "Encarregado" },
  { value: "fa06a689-3d84-4cc5-93cd-88025e5d0bd2", label: "Executor" },
  { value: "7bbe6f8a-f4f6-4dcd-85ca-ca692a400942-de-obras", label: "Administrador" },
];

const FieldsEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, setFilters, refetch } = useEmployeesContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFilters({ ...filters, search: value === "" ? undefined : value });
  };

  const handleRoleChange = (roleValue: string) => {
    setFilters({ ...filters, role: roleValue === "all" ? undefined : roleValue });
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className="fields-container my-10">
      <div className="flex justify-between w-full">
        <div className="flex gap-5">
          <InputGroup className="max-w-[300px]">
            <InputGroupInput
              placeholder="Buscar por nome"
              onChange={handleSearch}
              value={filters?.search || ""}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white hover:bg-white text-black border border-gray-300 cursor-pointer">
                <Filter className="w-4 h-4" /> Filtros
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Filtrar Funcionários</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={filters?.role || "all"}
                onValueChange={handleRoleChange}
              >
                <DropdownMenuRadioItem value="all">
                  Todas as Funções
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {jobRoles.map((role) => (
                  <DropdownMenuRadioItem key={role.value} value={role.value}>
                    {role.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          className="bg-black hover:bg-gray-800 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Adicionar Funcionário
        </Button>
      </div>

      <CreateEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default FieldsEmployee;
