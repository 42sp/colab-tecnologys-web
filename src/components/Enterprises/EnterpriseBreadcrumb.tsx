import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

// Mapeamento das rotas para nomes de exibição
const routeNames: { [key: string]: string } = {
    'info': 'Informações Gerais',
    'servicos': 'Serviços',
    'andares': 'Andares e Quantitativos',
    'documentos': 'Documentos',
    'historico': 'Histórico',
};

interface EnterpriseBreadcrumbProps {
    constructionName?: string | null;
    isLoading: boolean;
}

export function EnterpriseBreadcrumb({ constructionName, isLoading }: EnterpriseBreadcrumbProps) {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const subPageKey = useMemo(() => {
        const pathSegments = location.pathname.split('/').filter(segment => segment);
        
        if (pathSegments.length === 2 && pathSegments[1] === id) {
            return 'info';
        }
        
        return pathSegments[2] || 'info'; 
    }, [location.pathname, id]);

    const subPageTitle = routeNames[subPageKey] || 'Detalhes';
    
    const enterpriseBaseUrl = `/empreendimentos/${id}/info`;

    if (!id) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Empreendimentos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* 1. Link para a lista de Empreendimentos */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/empreendimentos">Empreendimentos</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                {/* 2. Nome da Construção */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={enterpriseBaseUrl}>
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-1 text-gray-500" />
                            ) : (
                                <span className="font-semibold text-gray-900">
                                    {constructionName || 'Carregando Nome...'}
                                </span>
                            )}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                {/* 3. Nome da Subpágina */}
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{subPageTitle}</BreadcrumbPage>
                        </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    );
}