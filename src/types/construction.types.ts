import type { Paginated, Service } from '@feathersjs/feathers'

export type ConstructionStatus = "Em Andamento" | "Atrasado" | "Concluído";

export interface Construction {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    start_date?: string; 
    expected_end_date?: string; 
    description?: string;
    is_active?: boolean;
    created_at?: string; 
    updated_at?: string; 
    idx?: number;
    status?: ConstructionStatus;
}

export interface ConstructionService extends Service<Construction> {} 

export type ConstructionPaginatedResult = Paginated<Construction>;