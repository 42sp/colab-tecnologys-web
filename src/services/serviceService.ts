// src/services/serviceService.ts

import client from "@/feathers";
import type { Services, ImportBulkResult } from '@/types/services.types'




const servicesClient = client.service('services');

export const serviceService = {
  async importBulk(data: Services[]): Promise<ImportBulkResult> {
    const token = window.localStorage.getItem('feathers-jwt');

    const response = await fetch('http://localhost:3030/services/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( data ),
    });

    if (!response.ok) {
      throw new Error(`Erro ao importar CSV: ${response.statusText}`);
    }

    return await response.json();
  },
};