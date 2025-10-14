// src/hooks/useConstructions.ts
import { useState, useEffect, useCallback } from 'react';
import client from '@/feathers'; 
// Importa as tipagens do arquivo centralizado
import type { Construction, ConstructionPaginatedResult } from '@/types/construction.types';


// Define o formato de retorno do hook
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

export const useConstructions = (): UseConstructionsResult => {
    const [constructions, setConstructions] = useState<Construction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função de busca
    const fetchConstructions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TypeScript agora sabe que client.service('constructions') retorna um Serviço de Construction
            const constructionsService = client.service('constructions'); 
            
            // O retorno de .find() é Paginated<Construction> (ou Construction[] se não paginado)
            // A conversão 'as ConstructionPaginatedResult' agora é válida após a correção do feathers.ts
            const response = await constructionsService.find() as ConstructionPaginatedResult;
            setConstructions(response.data);
        } catch (err) {
            console.error('Erro ao buscar empreendimentos:', err);
            const errorMessage = (err as any).message || 'Falha ao carregar os dados. Tente novamente.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ... (Restante do código do useEffect, lógica de derivação e retorno) ...

    useEffect(() => {
        fetchConstructions();
    }, [fetchConstructions]);

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