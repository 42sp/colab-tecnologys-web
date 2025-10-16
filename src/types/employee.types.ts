// src/types/employee.types.ts

export interface Employee {
  /** Identificador único do funcionário */
  id: string;

  /** Matrícula do funcionário (campo idx no backend) */
  idx: number;

  /** Nome completo do funcionário */
  name: string;

  /** Número de telefone do funcionário */
  phone: string | null;

  /** Função (relacionada ao cargo ou perfil de acesso) */
  role_id: string;

  /** Datas de criação e atualização (opcional, podem ser úteis em logs ou auditoria) */
  created_at?: string;
  updated_at?: string;
}
