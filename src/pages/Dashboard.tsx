import Cards from "@/components/Dashboard/Cards";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import Fields from "@/components/Dashboard/Fields";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import { motion } from 'framer-motion'; 
import { useConstructionsContext } from "@/contexts/ConstructionsContext";
import { useAuth } from "@/contexts/AuthContext";
//import logger from '../utils/logger';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delayChildren: 0.1, staggerChildren: 0.05 }
  }
};

const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const Dashboard = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { cardData, isLoading, error } = useConstructionsContext();

  // Skeleton só na primeira carga
  const showSkeleton = isLoadingAuth || isLoading;

  //logger.info("DASHBOARD", "Renderizando. Estados:", { isAuthenticated, isLoadingAuth, isLoading });

  if (showSkeleton) {
    return (
      <motion.div
        key="skeleton"
        className="px-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DashboardSkeleton />
      </motion.div>
    );
  }

  if (!isAuthenticated) {
    //logger.warn("DASHBOARD", "Acesso negado. Redirecionamento deve ocorrer.");
    return (
      <div className="p-20 text-center text-red-600">
        Acesso negado. Redirecionando...
      </div>
    );
  }

  if (error) {
    //logger.error("DASHBOARD", `Erro ao carregar empreendimentos: ${error}`);
    return (
      <div className="p-20 text-center text-red-600">
        Erro ao carregar dados: {error}
      </div>
    );
  }

  //logger.info("DASHBOARD", "Renderizando conteúdo final do Dashboard.");

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
        <Fields />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DashboardTable />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
