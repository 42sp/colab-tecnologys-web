import { Eye, MapPin, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import './style.css';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useTheme } from '@/hook/useTheme';

import type { Construction } from '@/types/construction.types'; 




interface DashboardTableProps {
    constructions: Construction[]; 
}

// Função Mock para determinar o Status/Progresso
const getStatusAndProgress = (construction: Construction) => {
    if (construction.name.includes("Verde")) {
        return { 
            status: "Em andamento", 
            badgeClass: 'bg-yellow-100 text-yellow-800', 
            progress: 65 
        };
    }
    if (construction.name.includes("Azul")) {
        return { 
            status: "Concluído", 
            badgeClass: 'bg-green-100 text-green-800', 
            progress: 100 
        };
    }
    
    return { 
        status: "Atrasado", 
        badgeClass: 'bg-red-100 text-red-800', 
        progress: 30 
    };
}


const DashboardTable = ({ constructions }: DashboardTableProps) => { 
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
                    {constructions.map((construction) => {
                        const { status, badgeClass, progress } = getStatusAndProgress(construction);

                        return (
                            <TableRow key={construction.id} className='border border-gray-300'> 
                                <TableCell className="font-medium">{construction.name}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {construction.city}, {construction.state}
                                </TableCell>
                                <TableCell>
                                    <Badge className={badgeClass}>
                                        {status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Progress 
                                        value={progress} 
                                        className='bg-gray-200 dark:bg-gray-800' 
                                        classNameIndicator='dark:bg-white' 
                                    />
                                </TableCell>
                                <TableCell className='text-center'>
                                    {construction.start_date ? new Date(construction.start_date).toLocaleDateString() : '-'}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {construction.expected_end_date ? new Date(construction.expected_end_date).toLocaleDateString() : '-'}
                                </TableCell>
                                <TableCell className='text-end'>
                                    <div className='flex justify-center gap-2'>
                                        {/* Ações (botões) */}
                                        <Button className='bg-transparent hover:bg-transparent border border-gray-300 w-[32px] h-[32px] cursor-pointer'>
                                            <Eye color={theme === 'dark' ? 'white' : 'black'} />
                                        </Button>
                                        <Button className='bg-transparent hover:bg-transparent border border-gray-300 w-[32px] h-[32px] cursor-pointer'>
                                            <Pencil color={theme === 'dark' ? 'white' : 'black'} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {constructions.length === 0 && (
                <div className='p-5 text-center text-gray-500'>Nenhum empreendimento encontrado.</div>
            )}
        </div>
    );
}

export default DashboardTable;