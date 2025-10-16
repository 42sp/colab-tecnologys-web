import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { employeeService } from "@/services/employeeService";
import type { Employee } from "@/types/employee.types";
import type { ReactNode } from "react";

interface EmployeesContextValue {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(undefined);

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.find();
      setEmployees(data);
    } catch (err) {
      setError((err as any)?.message || "Falha ao carregar funcionários");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Só executa após autenticação estar pronta e usuário logado
  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated) {
      fetchEmployees();
    }
  }, [isLoadingAuth, isAuthenticated, fetchEmployees]);

  return (
    <EmployeesContext.Provider value={{ employees, loading, error, refresh: fetchEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployeesContext = (): EmployeesContextValue => {
  const context = useContext(EmployeesContext);
  if (!context) throw new Error("useEmployeesContext deve ser usado dentro de EmployeesProvider");
  return context;
};
