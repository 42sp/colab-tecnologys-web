import { useState, useEffect, useCallback } from 'react';
import client from '@/feathers'; 
import { useAuth } from '@/contexts/AuthContext'; 
import logger from '@/utils/logger';

import type { Construction, ConstructionPaginatedResult } from '@/types/construction.types';
import type { Service, Paginated } from '@feathersjs/feathers'; 


type ConstructionService = Service<Construction> & {
    find: (params?: any) => Promise<ConstructionPaginatedResult | Construction[]>;
};

interface UseConstructionsResult {
    constructions: Construction[];
    cardData: {
        total: number;
        inProgress: number;
        delayed: number;
        completed: number;
    };
    isLoading: boolean;
    error: string | null;
    refetch: () => void; 
}

// Função de Checagem de Paginação (Helper)
const isPaginated = (result: any): result is ConstructionPaginatedResult => {
    return result && Array.isArray(result.data) && typeof result.total === 'number';
};


export const useConstructions = (): UseConstructionsResult => {
    const { isAuthenticated } = useAuth();
    const [constructions, setConstructions] = useState<Construction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConstructions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const constructionsService = client.service('constructions') as ConstructionService; 
            
            const response = await constructionsService.find(); 

            if (isPaginated(response)) {
                setConstructions(response.data);
            } else {
                setConstructions(response as Construction[]);
            }

        } catch (err) {
            console.error('Erro ao buscar empreendimentos:', err);
            const errorMessage = (err as any).message || 'Falha ao carregar os dados. Tente novamente.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        logger.info("CONSTRUCTION", `Estado de Autenticação Atual: ${isAuthenticated}.`);
        // 🚨 Somente faz a busca se estiver autenticado!
        if (isAuthenticated) { 
            logger.info("CONSTRUCTION", "Autenticado. Iniciando fetchConstructions.");
            fetchConstructions();
        } else {
            // Se não está autenticado, paramos o loading e limpamos o erro.
            // O Dashboard será exibido sem dados. O usuário deve ser redirecionado para o Login.
            logger.warn("CONSTRUCTION", "Não autenticado ou aguardando. Bloqueando a busca de dados.");
            setIsLoading(false);
            setError("Não autenticado. Faça login.");
            setConstructions([]);
        }
    }, [isAuthenticated, fetchConstructions]);

    const totalConstructions = constructions.length;

    const inProgress = constructions.filter(c => c.name.includes('Em Andamento')).length; 
    const delayed = constructions.filter(c => c.name.includes('Atrasado')).length;
    const completed = constructions.filter(c => c.name.includes('Concluído')).length; 

    const cardData = {
        total: totalConstructions, inProgress, delayed, completed
    };

    return {
        constructions,
        cardData,
        isLoading,
        error,
        refetch: fetchConstructions 
    };
}