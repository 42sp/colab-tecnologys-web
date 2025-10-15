import Cards from "@/components/Dashboard/Cards";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import Fields from "@/components/Dashboard/Fields";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import logger from '../utils/logger';
import { motion } from 'framer-motion'; 
import { useConstructions } from '@/hook/useConstruction';
import { useAuth } from '../contexts/AuthContext';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            // Atraso inicial para a animação começar
            delayChildren: 0.1, 
            // Duração da transição principal
            staggerChildren: 0.05 
        }
    }
};


const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};


const Dashboard = () => {
    const { constructions, cardData, isLoading, error, refetch  } = useConstructions();
    const { isAuthenticated, isLoadingAuth } = useAuth();

    logger.info("DASHBOARD", "Renderizando. Estados:", { isAuthenticated, isLoadingAuth, isLoading });
    const isDashboardLoading = isLoadingAuth || isLoading;


    if (isDashboardLoading) {
        return (
            // Usamos motion.div com as variants do container para o skeleton também ter animação de montagem
            <motion.div
                key="skeleton"
                className="px-20" // Adicionado o padding para corresponder ao container principal
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* O DashboardSkeleton deve ser um componente estático, sem variants */}
                <DashboardSkeleton />
            </motion.div>
        );
    }

    if (!isAuthenticated) {
         // O AuthProvider já usa o navigate('/login') no logout.
         // Se este componente foi montado sem autenticação, useAuth deve ter uma forma de navegar.
         // Assumindo que você usa um <ProtectedRoute/> que lida com isso, 
         // o código abaixo pode ser removido.
         logger.warn("DASHBOARD", "Acesso negado. Redirecionamento deve ocorrer.");
         return <div className="p-20 text-center text-red-600">Acesso negado. Redirecionando...</div>; 
    }

    // Se o carregamento da autenticação terminou e estamos autenticados, mas a busca falhou
    if (error) {
        logger.error("DASHBOARD", `Erro ao carregar empreendimentos: ${error}`);
        return <div className="p-20 text-center text-red-600">Erro ao carregar dados: {error}</div>;
    }

    logger.info("DASHBOARD", "Renderizando conteúdo final do Dashboard.");

    return (
        <motion.div 
            key="content"
            className="px-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <motion.div variants={itemVariants}>
                <Cards data={cardData} /> 
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <Fields onCreationSuccess={refetch}/>
            </motion.div>

            <motion.div variants={itemVariants}>
                <DashboardTable constructions={constructions} /> 
            </motion.div>
        </motion.div>
    );
}

export default Dashboard;