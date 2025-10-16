import { Filter, Plus, Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { Button } from '../ui/button';
import { useState } from 'react';
import CreateConstructionModal from './CreateConstructionModal';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
} from '../ui/dropdown-menu';
import { useConstructionsContext } from '@/contexts/ConstructionsContext';

const brazilianStates = [
  { uf: 'AC', name: 'Acre' }, { uf: 'AL', name: 'Alagoas' }, { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' }, { uf: 'BA', name: 'Bahia' }, { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' }, { uf: 'ES', name: 'Espírito Santo' }, { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' }, { uf: 'MT', name: 'Mato Grosso' }, { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' }, { uf: 'PA', name: 'Pará' }, { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' }, { uf: 'PE', name: 'Pernambuco' }, { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' }, { uf: 'RN', name: 'Rio Grande do Norte' }, { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' }, { uf: 'RR', name: 'Roraima' }, { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' }, { uf: 'SE', name: 'Sergipe' }, { uf: 'TO', name: 'Tocantins' },
];

const constructionStatuses = [
  { value: 'Em Andamento', label: 'Em Andamento' },
  { value: 'Concluído', label: 'Concluído' },
  { value: 'Atrasado', label: 'Atrasado' },
];

const Fields: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, setFilters, refetch } = useConstructionsContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFilters({ ...filters, search: value === '' ? undefined : value });
  };

  const handleStateChange = (stateUF: string) => {
    setFilters({ ...filters, state: stateUF === 'all' ? undefined : stateUF });
  };

  const handleStatusChange = (statusValue: string) => {
    setFilters({ ...filters, status: statusValue === 'all' ? undefined : statusValue });
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className='fields-container m-10 mx-10'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-5'>
          <InputGroup className='max-w-[300px]'>
            <InputGroupInput 
              placeholder='Buscar por Nome' 
              onChange={handleSearch}
              value={filters?.search || ''}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='bg-white hover:bg-white text-black border border-gray-300 cursor-pointer'>
                <Filter className='w-4 h-4' /> Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start"> 
              <DropdownMenuLabel>Opções de Filtragem</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Estado</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56 max-h-96 overflow-y-auto">
                  <DropdownMenuLabel>Filtrar por Estado</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={filters?.state || 'all'} onValueChange={handleStateChange}>
                    <DropdownMenuRadioItem value="all">Todos os Estados</DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    {brazilianStates.map((state) => (
                      <DropdownMenuRadioItem key={state.uf} value={state.uf}>
                        {state.name} ({state.uf})
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={filters?.status || 'all'} onValueChange={handleStatusChange}>
                    <DropdownMenuRadioItem value="all">Todos os Status</DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    {constructionStatuses.map((status) => (
                      <DropdownMenuRadioItem key={status.value} value={status.value}>
                        {status.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button 
          className='bg-black hover:bg-gray-800 cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className='w-4 h-4'/> Adicionar Empreendimento
        </Button>
      </div>

      <CreateConstructionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Fields;
