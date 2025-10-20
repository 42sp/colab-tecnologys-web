export interface User {
    id: string; // format: 'uuid'
    cpf: string;
    name?: string; // Não é required no schema principal
    email?: string; // Não é required no schema principal
    phone?: string; // Não é required no schema principal
    roleId?: string;
    password?: string; // Presente no schema, mas resolvido/removido em hooks
    profile_id?: string; // format: 'uuid'
    is_active?: boolean;
    is_available?: boolean;
    created_at?: string; // format: 'date-time'
    updated_at?: string; // format: 'date-time'
}

// O tipo de dados que é enviado para a criação (contém a senha)
export interface UserData extends User {
    cpf: string;
    password: string;
}