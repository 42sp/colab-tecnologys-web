import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { employeeService } from "@/services/employeeService";
import { useEffect, useState } from "react";
import type { FullEmployeeProfile } from "@/types/FullEmployeeProfile.types";

// Mapeamento de Cargo
const roleMap: Record<string, string> = {
    "0cc1e385-a2b4-4b3a-b1c4-014d9d1016b5": "Encarregado",
    "7bbe6f8a-f4f6-4dcd-85ca-ca692a400942": "Administrador",
    "fa06a689-3d84-4cc5-93cd-88025e5d0bd2": "Executor",
};
const getRoleName = (role_id: string) => roleMap[role_id] ?? "—";

// Formatação de Data
const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
};

// Formatação de Telefone
const formatPhone = (phone: string | null) => {
    if (!phone) return "-";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11)
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    if (cleaned.length === 10)
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    return phone;
};

interface ViewEmployeeModalProps {
    employeeId: string | null;
    onClose: () => void;
}

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ employeeId, onClose }) => {
    const [fullEmployee, setFullEmployee] = useState<FullEmployeeProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isOpen = !!employeeId;

    // Efeito para buscar o perfil completo quando o ID mudar
    useEffect(() => {
        if (!employeeId) {
            setFullEmployee(null);
            return;
        }

        const fetchEmployee = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await employeeService.get(employeeId);
                setFullEmployee(data);
            } catch (err) {
                console.error("Erro ao carregar perfil:", err);
                setError("Não foi possível carregar o perfil completo.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);
    
    // Fecha o modal e reseta o estado de carregamento/erro
    const handleClose = () => {
        setFullEmployee(null);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[550px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {isLoading ? "Carregando..." : fullEmployee?.name || "Detalhes do Funcionário"}
                    </DialogTitle>
                </DialogHeader>

                {isLoading && (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    </div>
                )}
                
                {error && (
                    <div className="text-center p-4 text-red-600 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}

                {fullEmployee && !isLoading && (
                    <div className="space-y-5 pt-4">
                        
                        {/* Linha de Status e Função */}
                        <div className="flex items-center gap-6 border-b pb-4">
                            <Field label="Função" value={<Badge className="bg-blue-100 text-blue-800 text-sm hover:bg-blue-100">{getRoleName(fullEmployee.role_id)}</Badge>} isBadge />
                            
                            <Field label="Status Ativo" value={fullEmployee.is_active ? "Sim" : "Não"} isStatus color={fullEmployee.is_active ? "text-green-600" : "text-red-600"} />
                            <Field label="Disponível (Obra)" value={fullEmployee.is_available ? "Sim" : "Não"} isStatus color={fullEmployee.is_available ? "text-green-600" : "text-red-600"} />
                        </div>
                        
                        {/* Informações Pessoais e de Acesso */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-base">
                            
                            {/* Coluna: Contato/Acesso */}
                            <div className="col-span-1 space-y-4">
                                <Field label="Email" value={fullEmployee.email} />
                                <Field label="Telefone" value={formatPhone(fullEmployee.phone)} />
                                {/* Data de Nascimento */}
                                <Field label="Data de Nascimento" value={formatDate(fullEmployee.date_of_birth)} /> 
                                <Field label="CPF" value={fullEmployee.cpf || 'Não informado'} />
                            </div>
                            
                            {/* Coluna: Endereço */}
                            <div className="col-span-1 space-y-4">
                                <Field label="Endereço" value={fullEmployee.address || 'Não informado'} />
                                <Field label="Cidade/Estado" value={`${fullEmployee.city || '-'} / ${fullEmployee.state || '-'}`} />
                                <Field label="CEP" value={fullEmployee.postcode || 'Não informado'} />
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

// Componente auxiliar flexível
interface FieldProps {
    label: string;
    value: string ;
    isBadge?: boolean;
    isStatus?: boolean;
    color?: string;
}

const Field: React.FC<FieldProps> = ({ label, value, isBadge, color }) => (
    <div>
        <span className="text-sm font-medium text-gray-500 block">{label}</span>
        {isBadge ? value : (
            <span className={`text-base font-semibold text-gray-800 ${color}`}>
                {value}
            </span>
        )}
    </div>
);


export default ViewEmployeeModal;