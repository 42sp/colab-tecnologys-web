import { Eye, MapPin, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import './style.css';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useTheme } from '@/hook/useTheme';

const DashboardTable = () => {
	const {theme} = useTheme();

	return (
		<div className="border border-gray-300 rounded-lg mx-10 overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className='border-gray-300 '>
						<TableHead className="w-[250px] text-gray-500">Nome</TableHead>
						<TableHead className='text-gray-500'>Localização</TableHead>
						<TableHead className="text-gray-500">Status</TableHead>
						<TableHead className="text-gray-500">Progresso</TableHead>
						<TableHead className="text-center text-gray-500">Data Início</TableHead>
						<TableHead className="text-center text-gray-500">Previsão Término</TableHead>
						<TableHead className="text-center text-gray-500">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Residencial Vista Verde</TableCell>
						<TableCell className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
								São Paulo, SP
							</TableCell>
						<TableCell>
							<Badge color='yellow' className='bg-yellow-100 text-yellow-800' >
								Em andamento
							</Badge>
						</TableCell>
						<TableCell className="text-center">
							<Progress value={65} className='bg-gray-200 dark:bg-gray-800' classNameIndicator='dark:bg-white' />
						</TableCell>
						<TableCell className='text-center'>10/04/2023</TableCell>
						<TableCell className='text-center'>15/07/2024</TableCell>
						<TableCell className='text-end'>
							<div className='flex justify-center gap-2'>
								<Button className='bg-transparent hover:bg-transparent  border border-gray-300 w-[32px] h-[32px] cursor-pointer'>
									<Eye color={theme === 'dark' ? 'white' : 'black'} />
								</Button>
								<Button className='bg-transparent hover:bg-transparent  border border-gray-300 w-[32px] h-[32px] cursor-pointer'>
									<Pencil color={theme === 'dark' ? 'white' : 'black'} />
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