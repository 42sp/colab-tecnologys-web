import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { Loader2, Check, X } from "lucide-react";
import { employeeService } from "@/services/employeeService";
import { useEffect, useState } from "react";
import type { FullEmployeeProfile } from "@/types/FullEmployeeProfile.types";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { brazilianStates } from "@/utils/brazilianStates";

interface EditEmployeeModalProps {
    employeeId: string | null;
    onClose: (edited?: boolean) => void;
}

type FormData = Partial<Omit<FullEmployeeProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// Mapeamento dos Cargos
const ROLES = {
    encarregado: '0cc1e385-a2b4-4b3a-b1c4-014d9d1016b5',
    admin: '7bbe6f8a-f4f6-4dcd-85ca-ca692a400942',
    executor: 'fa06a689-3d84-4cc5-93cd-88025e5d0bd2',
};

// Função utilitária para limpar o CPF e Telefone antes da validação
const cleanNumericString = (val: string | undefined) => val ? val.replace(/\D/g, '') : undefined;
const brazilianUFs = brazilianStates.map(state => state.uf);

const employeeEditSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres.").optional(),
    email: z.string().email("Formato de e-mail inválido.").optional(),

    phone: z.string().transform(cleanNumericString).pipe(
        z.string().length(10, "O telefone deve ter 10 ou 11 dígitos (incluindo DDD).").or(
            z.string().length(11, "O telefone deve ter 10 ou 11 dígitos (incluindo DDD).")
        ).optional()
    ).optional(),

    // Valida a string como data no formato YYYY-MM-DD
    date_of_birth: z.string().optional().refine(
        (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
        "Data de Nascimento deve ser uma data válida (AAAA-MM-DD)."
    ),

    state: z.enum(brazilianUFs as [string, ...string[]], {
        invalid_type_error: "UF inválida. Selecione uma opção na lista."
    }).optional(),
    city: z.string().optional(),
    postcode: z.string().transform(cleanNumericString).pipe(
        z.string().length(8, "O CEP deve conter 8 dígitos.")
    ).optional(),
    address: z.string().optional(),
    cpf: z.string().transform(cleanNumericString).pipe(
        z.string().length(11, "O CPF deve conter 11 dígitos.")
    ).optional(),
    is_active: z.boolean().optional(),
    is_available: z.boolean().optional(),

    role_id: z.nativeEnum(ROLES, {
        errorMap: () => ({ message: "O cargo selecionado é inválido." }),
    }).optional(),
}).partial();

type ValidationErrors = Record<keyof FormData, string | undefined>;

// Função de formatação de telefone para (xx) xxxxx-xxxx
const formatPhone = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 10) {
        return numericValue
            .replace(/^(\d{2})/, '($1) ')
            .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        return numericValue
            .replace(/^(\d{2})/, '($1) ')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
};

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employeeId, onClose }) => {
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const isOpen = !!employeeId;

    useEffect(() => {
        if (!employeeId) return;

        const fetchEmployee = async () => {
            setIsLoading(true);
            setError(null);
            setValidationErrors({});
            try {
                const data = await employeeService.get(employeeId);
                const { id, user_id, created_at, updated_at, ...restData } = data;
                setFormData(restData);
            } catch (err) {
                console.error("Erro ao carregar perfil para edição:", err);
                setError("Não foi possível carregar os dados de edição.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        let processedValue = value;
        if (id === 'phone') {
            processedValue = formatPhone(value);
        }

        setValidationErrors(prev => ({ ...prev, [id]: undefined }));

        setFormData(prev => ({ ...prev, [id]: processedValue }));
    };

    const handleValueChange = (id: keyof FormData, value: string | boolean) => {
        setValidationErrors(prev => ({ ...prev, [id]: undefined }));

        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!employeeId) return;

        setValidationErrors({});
        setError(null);
        setIsSaving(true);

        // 1. PREPARAÇÃO DO PAYLOAD BRUTO E LIMPEZA DE VAZIOS/NULOS
        const rawDataForValidation: FormData = Object.fromEntries(
            Object.entries(formData)
                .map(([key, value]) => {
                    if (value === '' || value === null || value === undefined) {
                        return [key, undefined];
                    }

                    if (key === 'date_of_birth' && typeof value === 'string') {
                        return [key, value.split('T')[0]];
                    }

                    return [key, value];
                })
                .filter(([, value]) => value !== undefined)
        ) as FormData;


        // 2. VALIDAÇÃO ZOD
        const validationResult = employeeEditSchema.safeParse(rawDataForValidation);

        if (!validationResult.success) {
            setIsSaving(false);
            const newErrors: ValidationErrors = {};
            validationResult.error.errors.forEach(err => {
                if (err.path.length > 0) {
                    const errorMessage = err.message === 'UF inválida. Selecione uma opção na lista.'
                        ? 'Selecione um Estado válido.'
                        : err.message;

                    newErrors[err.path[0] as keyof FormData] = errorMessage;
                }
            });
            setValidationErrors(newErrors);
            setError("Verifique os campos destacados abaixo.");
            return;
        }

        // 3. PREPARAÇÃO FINAL DO PAYLOAD
        const dataToPatch = validationResult.data;

        // Se o objeto estiver vazio, não faz a requisição
        if (Object.keys(dataToPatch).length === 0) {
            setIsSaving(false);
            setError("Nenhuma alteração foi detectada para salvar.");
            return;
        }

        console.log("Payload de Patch Validado (FINAL):", dataToPatch);

        try {
            await employeeService.patch(employeeId, dataToPatch);
            onClose(true);
        } catch (err) {
            console.error("Erro ao salvar edição:", err);
            const serverError = (err as any)?.response?.data?.message || 'Falha ao salvar. Verifique os dados.';
            setError(serverError);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        setFormData({});
        setError(null);
        setValidationErrors({});
        onClose(false);
    };

    const isReady = !isLoading && isOpen && formData;

    const phoneValue = formData.phone ? formatPhone(formData.phone) : '';

    const getError = (id: keyof FormData) => validationErrors[id];

    // Função auxiliar para obter a chave do cargo (admin, encarregado, executor) a partir do UUID
    const getRoleNameByUuid = (uuid: string | undefined): keyof typeof ROLES | '' => {
        if (!uuid) return '';
        const roleEntry = Object.entries(ROLES).find(([, value]) => value === uuid);
        return roleEntry ? (roleEntry[0] as keyof typeof ROLES) : '';
    };
    
    // UUID do cargo atual para o Select
    const currentRoleUuid = formData.role_id || '';
    
    // Nome do cargo atual, usado para exibir no Select
    const currentRoleName = getRoleNameByUuid(currentRoleUuid);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[750px] p-8">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {`Editar Funcionário: ${formData.name || (isLoading ? "Carregando..." : "")}`}
                    </DialogTitle>
                    <DialogDescription className="mb-4">
                        Edite as informações do funcionário. Campos de status e acesso estão na seção final.
                    </DialogDescription>
                </DialogHeader>

                {isLoading && (
                    <div className="flex justify-center items-center h-40"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                )}

                {error && (
                    <div className="text-center p-3 text-red-600 bg-red-50 rounded-md text-sm">{error}</div>
                )}

                {isReady && (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* 1. DADOS PESSOAIS E DE CONTATO */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Detalhes Pessoais e Contato</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                                {/* Nome */}
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        value={formData.name || ''}
                                        onChange={handleInputChange}
                                        className={getError('name') ? 'border-red-500' : ''}
                                    />
                                    {getError('name') && <p className="text-red-500 text-xs mt-1">{getError('name')}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        className={getError('email') ? 'border-red-500' : ''}
                                    />
                                    {getError('email') && <p className="text-red-500 text-xs mt-1">{getError('email')}</p>}
                                </div>

                                {/* Telefone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input
                                        id="phone"
                                        value={phoneValue}
                                        onChange={handleInputChange}
                                        maxLength={16}
                                        className={getError('phone') ? 'border-red-500' : ''}
                                    />
                                    {getError('phone') && <p className="text-red-500 text-xs mt-1">{getError('phone')}</p>}
                                </div>

                                {/* Data de Nascimento */}
                                <div className="space-y-2">
                                    <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={formData.date_of_birth?.split('T')[0] || ''}
                                        onChange={handleInputChange}
                                        className={getError('date_of_birth') ? 'border-red-500' : ''}
                                    />
                                    {getError('date_of_birth') && <p className="text-red-500 text-xs mt-1">{getError('date_of_birth')}</p>}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        {/* 2. ENDEREÇO */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Endereço</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">

                                {/* SELECT DO ESTADO/UF */}
                                <div className="space-y-2">
                                    <Label htmlFor="state">Estado (UF)</Label>
                                    <Select
                                        onValueChange={(value) => handleValueChange('state', value)}
                                        value={formData.state || ''}
                                    >
                                        <SelectTrigger id="state" className={getError('state') ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Selecione o Estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brazilianStates.map((state) => (
                                                <SelectItem key={state.uf} value={state.uf}>
                                                    {`${state.uf} - ${state.name}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {getError('state') && <p className="text-red-500 text-xs mt-1">{getError('state')}</p>}
                                </div>

                                {/* Cidade */}
                                <div className="space-y-2">
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input
                                        id="city"
                                        value={formData.city || ''}
                                        onChange={handleInputChange}
                                        className={getError('city') ? 'border-red-500' : ''}
                                    />
                                    {getError('city') && <p className="text-red-500 text-xs mt-1">{getError('city')}</p>}
                                </div>

                                {/* CEP */}
                                <div className="space-y-2">
                                    <Label htmlFor="postcode">CEP</Label>
                                    <Input
                                        id="postcode"
                                        value={formData.postcode || ''}
                                        onChange={handleInputChange}
                                        className={getError('postcode') ? 'border-red-500' : ''}
                                    />
                                    {getError('postcode') && <p className="text-red-500 text-xs mt-1">{getError('postcode')}</p>}
                                </div>
                            </div>

                            {/* Linha 2: Rua, Número e Bairro */}
                            <div className="space-y-2 mt-4">
                                <Label htmlFor="address">Rua, Número e Bairro</Label>
                                <Textarea
                                    id="address"
                                    value={formData.address || ''}
                                    onChange={handleInputChange}
                                    className={`resize-none ${getError('address') ? 'border-red-500' : ''}`}
                                />
                                {getError('address') && <p className="text-red-500 text-xs mt-1">{getError('address')}</p>}
                            </div>
                        </div>

                        <Separator className="my-6" />

                        {/* 3. STATUS E ACESSO */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Status e Acesso</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                
                                {/* SELECT DO CARGO (role_id) */}
                                <div className="space-y-2">
                                    <Label htmlFor="role_id">Cargo</Label>
                                    <Select
                                        onValueChange={(value) => handleValueChange('role_id', value)}
                                        value={currentRoleUuid}
                                    >
                                        <SelectTrigger id="role_id" className={getError('role_id') ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Selecione o Cargo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(ROLES).map(([name, uuid]) => (
                                                <SelectItem key={uuid} value={uuid}>
                                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {getError('role_id') && <p className="text-red-500 text-xs mt-1">{getError('role_id')}</p>}
                                </div>
                                
                                {/* CPF (Login) */}
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF (Login)</Label>
                                    <Input
                                        id="cpf"
                                        value={formData.cpf || ''}
                                        onChange={handleInputChange}
                                        className={getError('cpf') ? 'border-red-500' : ''}
                                    />
                                    {getError('cpf') && <p className="text-red-500 text-xs mt-1">{getError('cpf')}</p>}
                                </div>

                                {/* SWITCH para is_active: Ativo/Inativo no sistema */}
                                <div className="flex items-center justify-between p-3 rounded-md border border-gray-300">
                                    <div className="flex flex-col">
                                        <Label htmlFor="is_active" className="text-sm font-medium leading-none cursor-pointer">
                                            Ativo no Sistema
                                        </Label>
                                        <span className={`text-xs mt-1 font-semibold ${formData.is_active ? 'text-green-600' : 'text-gray-600'}`}>
                                            {formData.is_active ? <><Check className="inline w-3 h-3 mr-1" /> ATIVO</> : <><X className="inline w-3 h-3 mr-1" /> INATIVO</>}
                                        </span>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={!!formData.is_active}
                                        onCheckedChange={(checked) => handleValueChange('is_active', checked)}
                                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-800"
                                    />
                                </div>

                                {/* SWITCH para is_available: Disponível/Indisponível para obra */}
                                <div className="flex items-center justify-between p-3 rounded-md border border-gray-300">
                                    <div className="flex flex-col">
                                        <Label htmlFor="is_available" className="text-sm font-medium leading-none cursor-pointer">
                                            Disponível para Obra
                                        </Label>
                                        <span className={`text-xs mt-1 font-semibold ${formData.is_available ? 'text-blue-600' : 'text-gray-600'}`}>
                                            {formData.is_available ? <><Check className="inline w-3 h-3 mr-1" /> SIM</> : <><X className="inline w-3 h-3 mr-1" /> NÃO</>}
                                        </span>
                                    </div>
                                    <Switch
                                        id="is_available"
                                        checked={!!formData.is_available}
                                        onCheckedChange={(checked) => handleValueChange('is_available', checked)}
                                        className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-800"
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-6">
                            <Button type="button" variant="outline" onClick={handleClose} disabled={isSaving}>Cancelar</Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar Alterações
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditEmployeeModal;