export type FullEmployeeProfile = {
    // PROPRIEDADES DE PROFILE 
    id: string;    
    user_id: string;         
    name: string;
    email: string;
    phone: string | null;    
    role_id: string;        
    
    // Endereço e Data de Nascimento
    date_of_birth: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postcode: string | null;
    
    // PROPRIEDADES DE USER 
    cpf: string;             // Campo importante para o modal
    is_active: boolean;      // Status de Ativo/Inativo
    is_available: boolean;   // Status de Disponível para Obra
    
    // Timestamps
    created_at: string;
    updated_at: string;
    finished_at?: string | null;
};