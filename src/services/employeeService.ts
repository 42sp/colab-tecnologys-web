// src/services/employeeService.ts
import client from "@/feathers";
import type { Employee } from "@/types/employee.types";

export const employeeService = {
  async find(): Promise<Employee[]> {
    try {
      const res = await client.service("profile").find({ query: { $limit: 100 } });

      if (Array.isArray(res)) {
        return res;
      }

      if ("data" in res && Array.isArray(res.data)) {
        return res.data;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar employees:", error);
      return [];
    }
  },
};
