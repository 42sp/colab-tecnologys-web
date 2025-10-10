import { Filter, Plus, Search } from 'lucide-react';
import './style.css';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { Button } from '../ui/button';

const Fields = () => {
	return (
		<div className='fields-container m-10 mx-10'>
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
				<Button className='bg-black hover:bg-gray-800 cursor-pointer'>
					<Plus /> Adicionar Empreendimento
				</Button>
			</div>
		</div>
	);
}

export default Fields;