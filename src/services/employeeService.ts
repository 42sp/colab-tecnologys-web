import client from "@/feathers";
import type { Service, ServiceMethods } from "@feathersjs/feathers";
import type { Employee } from "@/types/employee.types";
import type { FullEmployeeProfile } from "@/types/FullEmployeeProfile.types";

type EmployeeServiceType = Service<Employee> & {
  find: (params?: any) => Promise<Employee[]>;
};

type EmployeeOrchestrationService = ServiceMethods<
  FullEmployeeProfile,
  Partial<FullEmployeeProfile>
>;

// 1. Serviço Orquestrador (para CREATE e PATCH)
// Chama o endpoint 'employee', que tem o hook de orquestração.
const employeeOrchestratorService = client.service(
  "employee"
) as unknown as EmployeeOrchestrationService;

// 2. Serviço de Leitura (para FIND e GET)
// Depende do seu backend: se 'profile' é o serviço que faz a união via hook ou view/join.
const employeeReadService = client.service("profile") as EmployeeServiceType;

export const employeeService = {
  async find(query?: any): Promise<Employee[]> {
    const result = await employeeReadService.find({ query });

    if ("data" in result && Array.isArray(result.data)) {
      return result.data;
    }

    return result as Employee[];
  },

  async get(id: string): Promise<FullEmployeeProfile> {
    return employeeReadService.get(id) as unknown as FullEmployeeProfile;
  },

  async create(
    data: Partial<FullEmployeeProfile>
  ): Promise<FullEmployeeProfile> {
    return employeeOrchestratorService.create(data);
  },

  async patch(
    id: string,
    data: Partial<FullEmployeeProfile>
  ): Promise<FullEmployeeProfile> {
    const result = await employeeOrchestratorService.patch(id, data);
    return result as FullEmployeeProfile;
  },
};
