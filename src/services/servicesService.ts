// src/services/servicesService.ts 

import client from "@/feathers";
import type { Service } from "@feathersjs/feathers";
import type { Services, ImportBulkResult } from '@/types/services.types'

const servicesClient: Service<Services> = client.service('services') as unknown as Service<Services>; 



export const servicesService = {
  
  async find(query?: any): Promise<Services[]> {
    const result = await servicesClient.find({ query });

    if (typeof result === 'object' && result !== null && 'data' in result && Array.isArray(result.data)) {
      return result.data;
    }

    return result as Services[];
  },
    
  async importBulk(data: Services[]): Promise<ImportBulkResult> {
    const token = window.localStorage.getItem('feathers-jwt');

    const response = await fetch('http://localhost:3030/services/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ao importar CSV: ${response.statusText}`);
    }

    return await response.json();
  },
};