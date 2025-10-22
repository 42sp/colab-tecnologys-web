export interface Employee {
  id: string;
  idx: number;
  name: string;
  phone: string | null;
  role_id: string;
  created_at?: string;
  updated_at?: string;
}
