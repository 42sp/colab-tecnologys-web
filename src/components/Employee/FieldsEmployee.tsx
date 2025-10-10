import { ChevronDown, Filter, RefreshCw, Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import './style.css';
import { Button } from '../ui/button';

const FieldsEmployee = () => {
	return (
		<div className='flex justify-between'>
			<div className='flex space-x-3'>
				<InputGroup>
					<InputGroupInput placeholder='Pesquisar funcionário' />
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
				</InputGroup>
				<InputGroup>
					<InputGroupInput placeholder='Filtrar por função' />
					<InputGroupButton>
						<ChevronDown />
					</InputGroupButton>
				</InputGroup>
				<Button className='cursor-pointer' variant='outline'><Filter /></Button>
				<Button className='cursor-pointer' variant='outline'><RefreshCw /></Button>
			</div>
			<Button className='py-5 cursor-pointer'>Adicionar Funcionário</Button>
		</div>
	);
}

export default FieldsEmployee;