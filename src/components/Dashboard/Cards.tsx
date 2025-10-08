import { Building, Calendar, ChartNoAxesColumnIcon } from 'lucide-react';
import './style.css';
import { cn } from '@/lib/utils';
import CardComponent from './CardComponent';

const Cards = () => {
	return (
		<>
			<div className={cn(
					"cards-container",
					"m-10 mx-10"
				)}
			>
				<CardComponent
					title='Total de Empreendimentos'
					value="15"
					icon={
						<div className='flex bg-gray-100 rounded-full w-10 h-10 items-center justify-center'>
							<Building color="gray" />
						</div>
					}
				/>
				<CardComponent
					title='Em Andamento'
					value="8"
					icon={
						<div className='flex bg-yellow-100 rounded-full w-10 h-10 items-center justify-center'>
							<Calendar color="orange" />
						</div>
					}
				/>
				<CardComponent
					title='Atrasados'
					value="2"
					icon={
						<div className='flex bg-red-100 rounded-full w-10 h-10 items-center justify-center'>
							<ChartNoAxesColumnIcon color='red' />
						</div>
					}
				/>
				<CardComponent
					title='Concluídos'
					value="5"
					icon={
						<div className='flex bg-green-100 rounded-full w-10 h-10 items-center justify-center'>
							<ChartNoAxesColumnIcon color='green' className='rounded-full' />
						</div>
					}
				/>
			</div>
		</>
	);
}

export default Cards;