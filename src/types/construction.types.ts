import type { Paginated, Service } from '@feathersjs/feathers'



export interface Construction {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    start_date?: string | null; 
    expected_end_date?: string | null; 
    description?: string;
    is_active?: boolean;
    created_at?: string; 
    updated_at?: string; 
    idx?: number;
    finished_at?: string;
}

export interface ConstructionService extends Service<Construction> {} 

export type ConstructionPaginatedResult = Paginated<Construction>;