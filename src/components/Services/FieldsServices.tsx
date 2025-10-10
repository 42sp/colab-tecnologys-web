import { Plus, Table } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import './style.css';

const FieldsServices = () => {
  return (
    <div className="flex justify-between mt-10 flex-nowrap">
      {/* Seção de filtros */}
      <div className="flex space-x-2">
        {/* Torre */}
        <Select>
          <SelectTrigger className="w-[120px] border-gray-300 bg-white cursor-pointer">
            <SelectValue placeholder="Torre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Torre A</SelectItem>
            <SelectItem value="b">Torre B</SelectItem>
            <SelectItem value="c">Torre C</SelectItem>
          </SelectContent>
        </Select>

        {/* Pavimento */}
        <Select>
          <SelectTrigger className="w-[140px] border-gray-300 bg-white cursor-pointer">
            <SelectValue placeholder="Pavimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1º Andar</SelectItem>
            <SelectItem value="2">2º Andar</SelectItem>
            <SelectItem value="3">3º Andar</SelectItem>
          </SelectContent>
        </Select>

        {/* Classificação */}
        <Select>
          <SelectTrigger className="w-[160px] border-gray-300 bg-white cursor-pointer">
            <SelectValue placeholder="Classificação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eletrica">Elétrica</SelectItem>
            <SelectItem value="hidraulica">Hidráulica</SelectItem>
            <SelectItem value="civil">Civil</SelectItem>
          </SelectContent>
        </Select>

        {/* Campo de busca */}
        <Input
          className="w-[240px] bg-white "
          placeholder="Buscar por ID, Serviço, Tarefeiro..."
        />
      </div>

      {/* Seção de ações */}
      <div className="space-x-2 flex">
        <Button variant="outline" className="border-gray-300 flex items-center gap-2 cursor-pointer">
          <Table className="h-4 w-4" />
          Tabela
        </Button>

        {/* Exportar */}
        <Select>
          <SelectTrigger className="w-[130px] border-gray-300 flex items-center gap-2 bg-white cursor-pointer">
            <SelectValue placeholder="Exportar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excel">Excel (.xlsx)</SelectItem>
            <SelectItem value="csv">CSV (.csv)</SelectItem>
            <SelectItem value="pdf">PDF (.pdf)</SelectItem>
          </SelectContent>
        </Select>

        {/* Colunas */}
        <Select>
          <SelectTrigger className="w-[130px] border-gray-300 flex items-center gap-2 bg-white cursor-pointer">
            <SelectValue placeholder="Colunas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Padrão</SelectItem>
            <SelectItem value="compact">Compacta</SelectItem>
            <SelectItem value="expandida">Expandida</SelectItem>
          </SelectContent>
        </Select>

        {/* Novo serviço */}
        <Button className='cursor-pointer'>
          <Plus className="h-4 w-4" />
          Novo Serviço
        </Button>
      </div>
    </div>
  );
};

export default FieldsServices;
