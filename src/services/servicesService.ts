// src/services/servicesService.ts 

import client from "@/feathers";
import type { Service } from "@feathersjs/feathers";
import type { Services, ImportBulkResult } from '@/types/services.types'

const servicesClient: Service<Services> = client.service('services') as unknown as Service<Services>; 

interface ProgressResult {
    total: number;
    done: number;
    progress: number;
}

interface UniqueValues {
    towers: string[];
    floors: string[];
}

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

async calculateProgressByConstruction(constructionId: string): Promise<ProgressResult> {

        console.log('work_id sendo buscado:', constructionId)
        // Busca todos os serviços para esta construção
        const result = await servicesClient.find({
            query: {
                work_id: constructionId, // Filtra pelo ID da construção
                $select: ['is_done'], 
            },
        });

        const data: Services[] = (result && 'data' in result) 
        ? (result.data as Services[]) 
        : (result as Services[]);
        
        const total = data.length;
        const done = data.filter(s => s.is_done).length;

        // Calcula a porcentagem de progresso
        const progress = total > 0 ? (done / total) * 100 : 0;

        return { total, done, progress };
    },


    async getUniqueFilters(constructionId: string): Promise<UniqueValues> {
        // 1. Buscando todos os serviços (apenas torre e pavimento)
        const result = await servicesClient.find({
            query: {
                work_id: constructionId,
                $select: ['tower', 'floor'],
            },
        });

        const data: Services[] = (result && 'data' in result) 
            ? (result.data as Services[]) 
            : (result as Services[]);

        // 2. Extraindo valores únicos de tower
        const uniqueTowers = Array.from(
            new Set(data.map(s => s.tower).filter(t => t && t.trim() !== ''))
        ).sort();

        // 3. Extraindo valores únicos de floor
        const uniqueFloors = Array.from(
            new Set(data.map(s => s.floor).filter(f => f && f.trim() !== ''))
        ).sort((a, b) => {
             // Tenta ordenar numericamente se possível (ex: '1º PAV' vs '2º PAV')
             const numA = parseInt(a);
             const numB = parseInt(b);
             return isNaN(numA) || isNaN(numB) ? a.localeCompare(b) : numA - numB;
        });

        return {
            towers: uniqueTowers,
            floors: uniqueFloors,
        };
    }
};