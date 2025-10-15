import { Filter, Plus, Search } from 'lucide-react';
import './style.css';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { Button } from '../ui/button';
import { useState } from 'react';
import CreateConstructionModal from './CreateConstructionModal';
import type { Construction } from '@/types/construction.types';

interface FieldsProps {
    // 🎯 Receber a função de recarga do pai (Dashboard)
    onCreationSuccess: (newConstruction: Construction) => void;
}

const Fields: React.FC<FieldsProps> = ({ onCreationSuccess }) => {
    // Estado para controlar a abertura do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='fields-container m-10 mx-10'>
            {/* ... Componentes de Busca e Filtro ... */}
            <InputGroup className='max-w-[300px]'>
                <InputGroupInput placeholder='Buscar Empreendimento' />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>
            <div className='flex gap-5'>
                <Button className='bg-white hover:bg-white text-black border border-gray-300 cursor-pointer'>
                    <Filter /> Filtros
                </Button>
                
                {/* 🎯 Botão de Abrir Modal */}
                <Button 
                    className='bg-black hover:bg-gray-800 cursor-pointer'
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus /> Adicionar Empreendimento
                </Button>
            </div>
            
            {/* 🎯 Modal de Criação */}
            <CreateConstructionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // Quando a criação for sucesso, chama o refetch do Dashboard
                onSuccess={onCreationSuccess}
            />
        </div>
    );
}

export default Fields;