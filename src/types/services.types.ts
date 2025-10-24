export type Services = {
  work_id: string; // vindo da URL (useParams)
  service_code: string; // ← CSV: 'ID'
  tower: string; // ← CSV: 'TORRE'
  floor: string; // ← CSV: 'PAV'
  apartment: string; // ← CSV: 'APTO'
  measurement_unit: string; // ← CSV: 'UNIDADE DE MEDIÇÃO'
  wall: string; // ← CSV: 'PAREDE'
  thickness: number; // ← CSV: 'ESPESSURA'
  marking_m: number; // ← CSV: 'MARCAÇÃO (M)'
  fixation_m: number; // ← CSV: 'FIXAÇÃO (M)'
  elevation_m2: number; // ← CSV: 'ELEVAÇÃO (M²)'
  qty_material_m2: number; // ← CSV: 'QTO MAT (m²)'
  qty_model_m2: number; // ← CSV: 'QTO MOD (m²)'
};

export interface ServicesClientService {
  find: (...args: any[]) => Promise<any>;
  get: (...args: any[]) => Promise<any>;
  create: (data: Services[] | Services, params?: any) => Promise<any>;
  patch: (...args: any[]) => Promise<any>;
  remove: (...args: any[]) => Promise<any>;
  importBulk: (data: Services[]) => Promise<ImportBulkResult>;
}

export interface ImportBulkResult {
    importedCount: number;
    totalCount: number;
    errors: {
        line: number;
        header: string;
        value: string | number;
        reason: string;
    }[];
}
