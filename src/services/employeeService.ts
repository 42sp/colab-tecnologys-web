import client from "@/feathers";
import type { Service } from "@feathersjs/feathers";
import type { Employee } from "@/types/employee.types";

// -------------------------------------------------------------
// 1. TIPAGENS
// -------------------------------------------------------------

// Tipo para o Serviço de Busca (Profile/Employee)
type EmployeeServiceType = Service<Employee> & {
  find: (params?: any) => Promise<Employee[]>;
};

// Tipo para o Serviço de Criação (employees): Ele deve retornar Employee
// pois o serviço de orquestração no backend fará essa composição.
type EmployeeCreationServiceType = Service<Employee>;

// -------------------------------------------------------------
// 2. DEFINIÇÃO DOS CLIENTES
// -------------------------------------------------------------

// Serviço para CRIAÇÃO: Aponta para o novo endpoint de orquestração 'employee'
const createEmployeeService = client.service("employees") as EmployeeCreationServiceType;

// Serviço para BUSCA/LISTAGEM: Continua apontando para 'profile'
const findProfileService = client.service("profile") as EmployeeServiceType;

export const employeeService = {
  /**
   * Busca a lista de funcionários (dados de perfil)
   */
  async find(query?: any): Promise<Employee[]> {
    // Usa o serviço de 'profile' para buscar dados
    const result = await findProfileService.find({ query });

    if ("data" in result && Array.isArray(result.data)) {
      return result.data;
    }

    return result as Employee[];
  }
  /**
   * Cria um novo funcionário (chama o orquestrador no backend)
   * @param data Dados do formulário (que contêm tanto User quanto Profile)
   */,

  async create(data: Partial<Employee>): Promise<Employee> {
    // O endpoint '/employees' lida com a divisão do payload e as duas chamadas internas.
    return createEmployeeService.create(data);
  },
};
