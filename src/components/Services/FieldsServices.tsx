import { Columns, Download, Plus, Table } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import './style.css';

const FieldsServices = () => {
	return (
		<div className='flex justify-between mt-10 flex-nowrap'>
			<div className='flex space-x-2'>
				<Button variant='outline'>Torre</Button>
				<Button variant='outline'>Pavimento</Button>
				<Button variant='outline'>Classificação</Button>
				<Input className='' placeholder="Buscar por ID, Serviço, Tarefeiro" />
			</div>
			<div className='space-x-2'>
				<Button variant='outline'>
					<Table />
					Tabela
				</Button>
				<Button variant='outline'>
					<Download />
					Exportar
				</Button>
				<Button variant='outline'>
					<Columns />
					Colunas
				</Button>
				<Button>
					<Plus />
					Novo Serviço
				</Button>

			</div>
		</div>
	);
}

export default FieldsServices;