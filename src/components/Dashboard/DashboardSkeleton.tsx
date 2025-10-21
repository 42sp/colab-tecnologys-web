import React from 'react';

const CardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md h-32 animate-pulse border border-gray-100">
        {/* Título do Card */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        {/* Valor Principal */}
        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
    </div>
);


const TableRowSkeleton: React.FC = () => (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-100 animate-pulse">
        {/* Coluna 1: Nome/Título */}
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        {/* Coluna 2: Status/Data */}
        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        {/* Coluna 3: Valor/Ação */}
        <div className="h-4 bg-gray-200 rounded w-1/6 ml-auto"></div>
    </div>
);

const DashboardSkeleton: React.FC = () => {
    return (
        <div className="px-20 py-8 space-y-10">
            {/*  Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>

            {/* Fields/Filtros Skeleton */}
            <div className="bg-white p-4 rounded-lg shadow-md animate-pulse space-y-4">
                <div className="flex space-x-4">
                    <div className="h-10 bg-gray-100 rounded w-48"></div> {/* Input 1 */}
                    <div className="h-10 bg-gray-100 rounded w-48"></div> {/* Input 2 */}
                    <div className="h-10 bg-gray-100 rounded w-24"></div> {/* Botão */}
                </div>
            </div>

            {/* Dashboard Table Skeleton */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Cabeçalho da Tabela */}
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                
                {/* Linhas da Tabela */}
                {[...Array(6)].map((_, index) => (
                    <TableRowSkeleton key={index} />
                ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-10 animate-pulse">
                Aguarde, carregando informações...
            </p>
        </div>
    );
};

export default DashboardSkeleton;