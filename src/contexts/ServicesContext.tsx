// src/context/ServicesContext.tsx

import React, { createContext, useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Services as TableServiceData } from "@/components/Services/TableColumns";
import { useGetServices } from "@/hooks/useGetService";

interface ServicesContextType {
    data: TableServiceData[];
    isLoading: boolean;
    error: string | null;
    workId: string | null;
    filters: any;

    // Paginação
    total: number; // Total de registros no servidor
    page: number; // Página atual
    pageSize: number; // Itens por página
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;

    applyFilters: (newFilters: any) => void;
    refetch: () => void;
}

const DEFAULT_PAGE_SIZE = 10;

const ServicesContext = createContext<ServicesContextType | undefined>(
    undefined
);


export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { workId } = useParams<{ workId?: string }>(); 
    const currentWorkId = workId || null; 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [filters, setFilters] = useState({});
    const [refetchIndex, setRefetchIndex] = useState(0); 

    const combinedFilters = useMemo(() => ({
        ...filters,
        $limit: pageSize,
        $skip: (page - 1) * pageSize,
    }), [filters, page, pageSize]);

    const { services, total, isLoading, error } = useGetServices(
        currentWorkId,
        combinedFilters,
        refetchIndex
    );

    const handleSetPage = (newPage: number) => {
        setPage(newPage);
    };

    const handleSetPageSize = (newSize: number) => {
        setPageSize(newSize);
        setPage(1); // Sempre volta para a primeira página ao mudar o tamanho
    };

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
        total, 
        page,
        pageSize,
        setPage: handleSetPage,
        setPageSize: handleSetPageSize,
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