import client from "@/feathers";
import type { Service, ServiceMethods } from "@feathersjs/feathers";
import type { Employee } from "@/types/employee.types";
import type { FullEmployeeProfile } from "@/types/FullEmployeeProfile.types";

type EmployeeServiceType = Service<Employee> & {
  find: (params?: any) => Promise<Employee[]>;
};


type EmployeeCreationServiceType = ServiceMethods<
  FullEmployeeProfile,
  Partial<FullEmployeeProfile>
>;


const createEmployeeService = client.service(
  "employees"
) as unknown as EmployeeCreationServiceType;
const findProfileService = client.service("profile") as EmployeeServiceType;

export const employeeService = {
  async find(query?: any): Promise<Employee[]> {
    const result = await findProfileService.find({ query });

    if ("data" in result && Array.isArray(result.data)) {
      return result.data;
    }

    return result as Employee[];
  },

  async get(id: string): Promise<FullEmployeeProfile> {
    return findProfileService.get(id) as unknown as FullEmployeeProfile;
  },

  async create(
    data: Partial<FullEmployeeProfile>
  ): Promise<FullEmployeeProfile> {
    return createEmployeeService.create(data);
  },
};
