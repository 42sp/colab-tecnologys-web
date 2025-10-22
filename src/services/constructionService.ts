import client from "@/feathers";
import type { Service } from "@feathersjs/feathers";
import type { Construction, ConstructionPaginatedResult } from "@/types/construction.types";

type ConstructionService = Service<Construction> & {
  find: (params?: any) => Promise<ConstructionPaginatedResult | Construction[]>;
};

const service = client.service("constructions") as ConstructionService;

export const constructionService = {
  async find(query?: any): Promise<Construction[]> {
    const result = await service.find({ query });

    if ("data" in result && Array.isArray(result.data)) {
      return result.data;
    }''

    return result as Construction[];
  },

  async get(id: string): Promise<Construction> {
    return service.get(id);
  },

  async create(data: Partial<Construction>): Promise<Construction> {
    return service.create(data);
  },

  async patch(id: string, data: Partial<Construction>): Promise<Construction | Construction[]> {
    return service.patch(id, data);
  },

  async remove(id: string): Promise<Construction | Construction[]> {
    return service.remove(id);
  },
};
