import './style.css';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface CardComponentProps {
	title: string;
	description?: string;
	footerText?: string;
	value: string;
	trend?: string;
	icon?: React.ReactNode;
}

const CardComponent = (props: CardComponentProps) => {
	return (
		<div className={
			cn("card-component-container",
				"flex-1"
			)
		}>
			<Card className='flex justify-between items-center p-5 flex-row h-35 border-gray-300'>
				<div>
					<CardDescription className='grid text-wrap' >{props.title}</CardDescription>
					<CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
						{props.value}
					</CardTitle>
				</div>
				<div>
					{props.icon}
				</div>
			</Card>
		</div>
	);
}

export default CardComponent;