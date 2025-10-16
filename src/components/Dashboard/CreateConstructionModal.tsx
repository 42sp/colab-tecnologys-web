import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'react-toastify';
import client from '@/feathers';
//import { useLogger } from "@/components/Logger/useLogger";
import type { Construction } from '@/types/construction.types';
import { z } from 'zod';

interface CreateConstructionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (newConstruction: Construction) => void;
}

const brazilianStates = [
    { uf: 'AC', name: 'Acre' },
    { uf: 'AL', name: 'Alagoas' },
    { uf: 'AP', name: 'Amapá' },
    { uf: 'AM', name: 'Amazonas' },
    { uf: 'BA', name: 'Bahia' },
    { uf: 'CE', name: 'Ceará' },
    { uf: 'DF', name: 'Distrito Federal' },
    { uf: 'ES', name: 'Espírito Santo' },
    { uf: 'GO', name: 'Goiás' },
    { uf: 'MA', name: 'Maranhão' },
    { uf: 'MT', name: 'Mato Grosso' },
    { uf: 'MS', name: 'Mato Grosso do Sul' },
    { uf: 'MG', name: 'Minas Gerais' },
    { uf: 'PA', name: 'Pará' },
    { uf: 'PB', name: 'Paraíba' },
    { uf: 'PR', name: 'Paraná' },
    { uf: 'PE', name: 'Pernambuco' },
    { uf: 'PI', name: 'Piauí' },
    { uf: 'RJ', name: 'Rio de Janeiro' },
    { uf: 'RN', name: 'Rio Grande do Norte' },
    { uf: 'RS', name: 'Rio Grande do Sul' },
    { uf: 'RO', name: 'Rondônia' },
    { uf: 'RR', name: 'Roraima' },
    { uf: 'SC', name: 'Santa Catarina' },
    { uf: 'SP', name: 'São Paulo' },
    { uf: 'SE', name: 'Sergipe' },
    { uf: 'TO', name: 'Tocantins' },
];

const stateNameToUFMap = new Map(brazilianStates.map(s => [s.name, s.uf]));


const today = new Date().toISOString().split('T')[0];

export const constructionFormSchema = z.object({
    
    name: z.string().min(1, "O nome é obrigatório.").max(100, "Máximo de 100 caracteres."),
    address: z.string().min(1, "O endereço é obrigatório."),
    city: z.string().min(1, "A cidade é obrigatória.").max(50, "Máximo de 50 caracteres."),
    state: z.string().min(1, "A seleção do estado é obrigatória."), 

    zip_code: z.string().max(9, "Máximo de 9 caracteres.").optional(),
    description: z.string().optional(),
    
    start_date: z.string().date('Formato de data inválido.').optional(),
    expected_end_date: z.string().date('Formato de data inválido.').optional(),
})

.refine((data) => {
    if (data.start_date && data.expected_end_date) {
        const start = new Date(data.start_date);
        const end = new Date(data.expected_end_date);
        return end > start; 
    }
    return true; 
}, {
    message: "A Data de Finalização deve ser posterior à Data de Início.",
    path: ["expected_end_date"],
})

.refine((data) => {
    if (data.start_date) {
        return data.start_date >= today;
    }
    return true;
}, {
    message: "A Data de Início não pode ser anterior à data atual.",
    path: ["start_date"], 
});



type FormData = z.infer<typeof constructionFormSchema>;

const initialFormData: FormData = {
    name: '',
    address: '',
    city: '',
    state: '', 
    zip_code: '', 
    description: '', 
    start_date: '', 
    expected_end_date: '',
};


const CreateConstructionModal: React.FC<CreateConstructionModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<z.ZodIssue[]>([]);
    //const logger = useLogger();

    const getMinEndDate = () => {
        const startDate = formData.start_date;
        if (startDate) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + 1); 
            return date.toISOString().split('T')[0];
        }
        return ''; 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => prev.filter(err => err.path[0] !== id));
    };

    const handleStateChange = (value: string) => {
        setFormData(prev => ({ ...prev, state: value }));
        setErrors(prev => prev.filter(err => err.path[0] !== 'state'));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        const validationResult = constructionFormSchema.safeParse(formData);

        if (!validationResult.success) {
            setErrors(validationResult.error.errors);
            //logger.warn("VALIDATION_FRONTEND", "Falha na validação do formulário.", validationResult.error.errors);
            toast.warn("Por favor, preencha todos os campos obrigatórios e verifique as datas.");
            return;
        }

        setIsLoading(true);

        const validatedData = validationResult.data;
        const stateUF = stateNameToUFMap.get(validatedData.state);

        if (!stateUF) {
            toast.error("Erro interno: Sigla do estado não encontrada.");
            setIsLoading(false);
            return;
        }
        
        const dataToSend: any = { ...validatedData, state: stateUF }; 
        
        if (dataToSend.start_date === '') {
            delete dataToSend.start_date;
        }
        if (dataToSend.expected_end_date === '') {
            delete dataToSend.expected_end_date;
        }
        
        //logger.info("CONSTRUCTION_MODAL", "Tentando criar empreendimento com dados validados:", dataToSend);

        try {
            const result: Construction = await client.service('constructions').create(dataToSend);
            
            await toast.promise(Promise.resolve(), {
                pending: "Criando empreendimento...",
                success: "Empreendimento criado com sucesso! 🎉",
                error: "Erro ao criar empreendimento."
            });
            
            onSuccess(result);
            onClose(); 
            setFormData(initialFormData); 

        } catch (error: any) {
            
            const errorDetails = error.message || 'Erro de rede desconhecido.';
            //logger.error("API:ERROR", `Erro ao criar empreendimento no backend: ${errorDetails}`, error); 
            
            const validationErrors = error.errors ? JSON.stringify(error.errors, null, 2) : '';
            const userMessage = validationErrors 
                ? `Erro de Validação do Servidor (Verifique o console): ${validationErrors}` 
                : 'Erro: Falha ao comunicar com o servidor.';
            
            toast.error(userMessage);

        } finally {
            setIsLoading(false);
        }
    };

    const getError = (path: keyof FormData) => errors.find(err => err.path[0] === path)?.message;
    const isError = (path: keyof FormData) => !!getError(path);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Novo Empreendimento</DialogTitle>
                    <DialogDescription>
                        Preencha os dados básicos para iniciar um novo empreendimento.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreate}>
                    <div className="grid gap-4 py-4">
                        {/* 1. CAMPOS OBRIGATÓRIOS (name, address, city) */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nome</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} className={`col-span-3 ${isError('name') ? 'border-red-500' : ''}`} />
                            {isError('name') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('name')}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Endereço</Label>
                            <Input id="address" value={formData.address} onChange={handleChange} className={`col-span-3 ${isError('address') ? 'border-red-500' : ''}`} />
                            {isError('address') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('address')}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">Cidade</Label>
                            <Input id="city" value={formData.city} onChange={handleChange} className={`col-span-3 ${isError('city') ? 'border-red-500' : ''}`} />
                            {isError('city') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('city')}</p>}
                        </div>
                    
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">Estado</Label>
                            <Select onValueChange={handleStateChange} value={formData.state}>
                                <SelectTrigger id="state" className={`col-span-3 ${isError('state') ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Selecione o Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brazilianStates.map((state) => (
                                        
                                        <SelectItem key={state.uf} value={state.name}>
                                            {state.name} ({state.uf})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {isError('state') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('state')}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start_date" className="text-right">Data de Início</Label>
                            <Input 
                                id="start_date" 
                                type="date" 
                                value={formData.start_date} 
                                onChange={handleChange} 
                                min={today}
                                className={`col-span-3 ${isError('start_date') ? 'border-red-500' : ''}`}
                            />
                            {isError('start_date') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('start_date')}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expected_end_date" className="text-right">Data de Finalização</Label>
                            <Input 
                                id="expected_end_date" 
                                type="date" 
                                value={formData.expected_end_date} 
                                onChange={handleChange} 
                                min={getMinEndDate()} 
                                disabled={!formData.start_date}
                                className={`col-span-3 ${isError('expected_end_date') ? 'border-red-500' : ''}`}
                            />
                            {isError('expected_end_date') && <p className="col-span-4 text-xs text-red-500 text-right">{getError('expected_end_date')}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="zip_code" className="text-right">CEP</Label>
                            <Input id="zip_code" value={formData.zip_code || ''} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Descrição</Label>
                            <Input id="description" value={formData.description || ''} onChange={handleChange} className="col-span-3" /> 
                        </div>

                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>Cancelar</Button>
                        <Button type="submit" disabled={isLoading || errors.length > 0}>
                            {isLoading ? 'Salvando...' : 'Criar Empreendimento'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateConstructionModal;