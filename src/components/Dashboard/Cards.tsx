import { Building, Calendar, ChartNoAxesColumnIcon } from 'lucide-react';
import './style.css';
import { cn } from '@/lib/utils';
import CardComponent from './CardComponent';

interface CardsProps {
    data: {
        total: number;
        inProgress: number;
        delayed: number;
        completed: number;
    }
}

const Cards = ({ data }: CardsProps) => { 
    return (
        <>
            <div className={cn(
                        "cards-container",
                        "m-10 mx-10"
                    )}
            >
                <CardComponent
                    title='Total de Empreendimentos'
                    value={data.total.toString()} 
                    icon={
                        <div className='flex bg-gray-100 rounded-full w-11 h-11 items-center justify-center'>
                            <Building color="gray" />
                        </div>
                    }
                />
                <CardComponent
                    title='Em Andamento'
                    value={data.inProgress.toString()} 
                    icon={
                        <div className='flex bg-yellow-100 rounded-full w-11 h-11 items-center justify-center'>
                            <Calendar color="orange" />
                        </div>
                    }
                />
                <CardComponent
                    title='Atrasados'
                    value={data.delayed.toString()} 
                    icon={
                        <div className='flex bg-red-100 rounded-full w-11 h-11 items-center justify-center'>
                            <ChartNoAxesColumnIcon color='red' />
                        </div>
                    }
                />
                <CardComponent
                    title='Concluídos'
                    value={data.completed.toString()} 
                    icon={
                        <div className='flex bg-green-100 rounded-full w-11 h-11 items-center justify-center'>
                            <ChartNoAxesColumnIcon color='green' className='rounded-full' />
                        </div>
                    }
                />
            </div>
        </>
    );
}

export default Cards;