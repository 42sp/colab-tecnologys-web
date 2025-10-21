export interface User {
    id: string; 
    cpf: string;
    name?: string; 
    email?: string; 
    phone?: string; 
    roleId?: string;
    password?: string; 
    profile_id?: string; 
    is_active?: boolean;
    is_available?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface UserData extends User {
    cpf: string;
    password: string;
}