import Cards from "@/components/Dashboard/Cards";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import Fields from "@/components/Dashboard/Fields";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import { motion } from 'framer-motion'; 
import { useConstructions } from '@/hook/useConstruction';

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
    const { constructions, cardData, isLoading, error } = useConstructions();

    if (isLoading) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <DashboardSkeleton />;
            </motion.div>
    )
    }

    if (error) {
        return <div className="p-20 text-center text-red-600">Erro: {error}</div>;
    }

    return (
        <motion.div 
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
                <DashboardTable constructions={constructions} /> 
            </motion.div>

        </motion.div>
    );
}

export default Dashboard;