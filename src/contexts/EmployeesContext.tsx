import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { employeeService } from "@/services/employeeService";
import type { Employee } from "@/types/employee.types";
import type { ReactNode } from "react";

interface Filters {
  search?: string;
  role?: string;
}

interface EmployeesContextType {
  employees: Employee[];
  isLoading: boolean;
  isFirstLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const EmployeesContext = createContext<EmployeesContextType | null>(null);

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    if (!isAuthenticated) return;

    // Mostra skeleton apenas na primeira vez
    if (isFirstLoading) setIsLoading(true);
    setError(null);

    setIsLoading(true);
    setError(null);

    const query: Record<string, any> = {};
    if (filters.search) query.name = `%${filters.search}%`;
    if (filters.role) query.role_id = filters.role;

    try {
      const data = await employeeService.find(query);
      setEmployees(data);
    } catch (err) {
      setError((err as any)?.message || "Falha ao carregar funcionários");
    } finally {
      setIsLoading(false);
      if (isFirstLoading) setIsFirstLoading(false);
    }
  }, [filters, isAuthenticated]);

  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated) {
      fetchEmployees();
    }
  }, [isLoadingAuth, isAuthenticated, fetchEmployees]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        isLoading,
        isFirstLoading,
        error,
        refetch: fetchEmployees,
        filters,
        setFilters,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployeesContext() {
  const ctx = useContext(EmployeesContext);
  if (!ctx) throw new Error("useEmployeesContext deve ser usado dentro de EmployeesProvider");
  return ctx;
}
