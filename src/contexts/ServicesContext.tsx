// src/context/ServicesContext.tsx

import React, { createContext, useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Services as TableServiceData } from "@/components/Services/TableColumns";
import { useGetServices } from "@/hooks/useGetService";

// 1. Definição do Tipo do Contexto
interface ServicesContextType {
    data: TableServiceData[];
    isLoading: boolean;
    error: string | null;
    workId: string | null;
    filters: any;
    applyFilters: (newFilters: any) => void;
    refetch: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
    undefined
);


export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    
    const { workId } = useParams<{ workId?: string }>(); 
    
    //console.log('[ServicesProvider] workId do useParams:', workId);

    const currentWorkId = workId || null; 
    

    
    const [filters, setFilters] = useState({});
    const [refetchIndex, setRefetchIndex] = useState(0); 

    const { services, isLoading, error } = useGetServices(
        currentWorkId,
        filters,
        refetchIndex
    );
    
    // ... restante das funções applyFilters e refetch ...
    const applyFilters = (newFilters: any) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };
    const refetch = () => {
        setRefetchIndex((prev) => prev + 1);
    };

    const contextValue = useMemo(() => ({
        data: services,
        isLoading,
        error,
        workId: currentWorkId,
        filters,
        applyFilters,
        refetch,
    }), [services, isLoading, error, currentWorkId, filters, refetchIndex]);


    return (
        <ServicesContext.Provider value={contextValue}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error("useServices must be used within a ServicesProvider");
    }
    return context;
};