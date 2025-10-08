import { ChevronDown, Filter, Loader2, Search } from 'lucide-react';
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
				<Button variant='outline'><Filter /></Button>
				<Button variant='outline'><Loader2 /></Button>
			</div>
			<Button>Adicionar Funcionário</Button>
		</div>
	);
}

export default FieldsEmployee;