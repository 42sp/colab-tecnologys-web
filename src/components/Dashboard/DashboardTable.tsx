import { Eye, MapPin, Pencil, Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import './style.css';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import { useConstructionsContext } from '@/contexts/ConstructionsContext';
import { constructionService } from '@/services/constructionService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditConstructionModal from './EditConstructionModal';
import type { Construction } from '@/types/construction.types';

const getStatusFromDates = (construction: Construction) => {
  const now = new Date();
  const start = construction.start_date ? new Date(construction.start_date) : null;
  const end = construction.expected_end_date ? new Date(construction.expected_end_date) : null;

  if (construction.finished_at) return { status: 'Concluído', badgeClass: 'bg-green-100 text-green-800 text-base' };
  if (end && end < now) return { status: 'Atrasado', badgeClass: 'bg-red-100 text-red-800 text-base' };
  if (start && start <= now && end && end >= now) return { status: 'Em andamento', badgeClass: 'bg-yellow-100 text-yellow-800 text-base' };

  return { status: 'Agendada', badgeClass: 'bg-blue-100 text-blue-800 text-base' };
};

const getProgressColor = (status: string) => {
  switch (status) {
    case 'Em andamento':
      return 'bg-yellow-400';
    case 'Atrasado':
      return 'bg-red-500';
    case 'Concluído':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const DashboardTable: React.FC = () => {
  const { theme } = useTheme();
  const { constructions, refetch, constructionsProgress } = useConstructionsContext();
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingConstruction, setEditingConstruction] = useState<Construction | null>(null);

  const handleMarkAsFinished = async (constructionId: string) => {
    setUpdating(constructionId);
    try {
      await constructionService.patch(constructionId, { finished_at: new Date().toISOString() });
      await refetch();
    } catch (err) {
      console.error("Erro ao finalizar construção:", err);
    } finally {
      setUpdating(null);
    }
  };

  const handleEdit = (construction: Construction) => {
      setEditingConstruction(construction);
  };

  const handleCloseEditModal = () => {
      setEditingConstruction(null);
  };

  const navigate = useNavigate();

  const handleView = (constructionId: string) => {
    navigate(`/empreendimentos/${constructionId}/info`);
  }

  const calculateDeadlineProgress = (construction: Construction) => {
    const now = new Date().getTime();
    const start = construction.start_date ? new Date(construction.start_date).getTime() : now;
    const end = construction.expected_end_date ? new Date(construction.expected_end_date).getTime() : now;
    if (!end || !start) return 0;
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="border border-gray-300 rounded-lg mx-10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className='border-gray-300'>
            <TableHead className="w-[250px] text-gray-500 text-lg">Nome</TableHead>
            <TableHead className='text-gray-500 text-lg'>Localização</TableHead>
            <TableHead className="text-gray-500 text-lg">Status</TableHead>
            <TableHead className="text-gray-500 text-lg">Prazo</TableHead>
            <TableHead className="text-gray-500 text-center text-lg">Progresso (%)</TableHead>
            <TableHead className="text-center text-gray-500 text-lg">Data Início</TableHead>
            <TableHead className="text-center text-gray-500 text-lg">Previsão Término</TableHead>
            <TableHead className="text-center text-gray-500 text-lg">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {constructions.map((construction) => {
            const { status, badgeClass } = getStatusFromDates(construction);
            const deadlineProgress = calculateDeadlineProgress(construction);

            const currentProgress = constructionsProgress[construction.id] || 0;
            const progressColor = getProgressColor(status);

            return (
              <TableRow key={construction.id} className='border border-gray-300 text-base'>
                <TableCell className="font-medium">{construction.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {construction.city}, {construction.state}
                </TableCell>
                <TableCell>
                  <Badge className={badgeClass}>{status}</Badge>
                </TableCell>

                {/* Coluna de Prazo com Progress */}
                <TableCell className="text-center px-4">
                  <Progress
                    value={deadlineProgress}
                    className="h-4 w-[80px] rounded-lg bg-gray-200 dark:bg-gray-300"
                    classNameIndicator={`${getProgressColor(status)} rounded-lg transition-all duration-500`}
                  />
                </TableCell>

                {/* Coluna de Progresso mock 50% */}
                <TableCell className="text-center font-bold text-gray-700">{Math.round(currentProgress)}%</TableCell>

                <TableCell className='text-center'>
                  {construction.start_date ? new Date(construction.start_date).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className='text-center'>
                  {construction.expected_end_date ? new Date(construction.expected_end_date).toLocaleDateString() : '-'}
                </TableCell>

                {/* Ações com tooltips */}
                <TableCell className='text-end'>
                  <div className='flex justify-center gap-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={() => handleView(construction.id)} 
                            className='bg-transparent hover:bg-transparent border border-gray-300 w-[36px] h-[36px] cursor-pointer'>
                            <Eye color={theme === 'dark' ? 'white' : 'black'} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Visualizar</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleEdit(construction)} className='bg-transparent hover:bg-transparent border border-gray-300 w-[36px] h-[36px] cursor-pointer'>
                            <Pencil color={theme === 'dark' ? 'white' : 'black'} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            disabled={!!construction.finished_at || updating === construction.id}
                            onClick={() => handleMarkAsFinished(construction.id)}
                            className='bg-transparent hover:bg-transparent border border-gray-300 w-[36px] h-[36px] cursor-pointer'
                          >
                            <Check color={theme === 'dark' ? 'white' : 'green'} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Marcar como concluído</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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

      <EditConstructionModal 
          construction={editingConstruction}
          onClose={handleCloseEditModal}
      />
    </div>
  );
};

export default DashboardTable;
