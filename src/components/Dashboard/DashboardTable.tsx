import { Eye, LocateIcon, Map, MapPin, Pencil } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import './style.css';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

const DashboardTable = () => {
	return (
		<div className="border border-gray-300 rounded-lg mx-10 overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[250px]">Nome</TableHead>
						<TableHead>Localização</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead className="text-center">Progresso</TableHead>
						<TableHead className="text-center">Data Início</TableHead>
						<TableHead className="text-center">Previsão Término</TableHead>
						<TableHead className="text-center">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Residencial Vista Verde</TableCell>
						<TableCell className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
								São Paulo, SP
							</TableCell>
						<TableCell className='text-center'>
							<Badge color='yellow' className='bg-yellow-100 text-yellow-800' >
								Em andamento
							</Badge>
						</TableCell>
						<TableCell className="">
							<Progress value={65} className='bg-gray-200' classNameIndicator='bg-black' />
						</TableCell>
						<TableCell className='text-center'>10/04/2023</TableCell>
						<TableCell className='text-center'>15/07/2024</TableCell>
						<TableCell className='text-end'>
							<div className='flex justify-center'>
								<Button className='bg-transparent hover:bg-transparent'>
									<Eye color='black'/>
								</Button>
								<Button className='bg-transparent hover:bg-transparent'>
									<Pencil color='black'/>
								</Button>
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}

export default DashboardTable;