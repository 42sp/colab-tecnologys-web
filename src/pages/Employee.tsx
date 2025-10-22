import FieldsEmployee from "@/components/Employee/FieldsEmployee";
import TableEmployee from "@/components/Employee/TableEmployees";
import { useEmployeesContext } from "@/contexts/EmployeesContext"; 
import EmployeesPageSkeleton from "@/components/Employee/EmployeesPageSkeleton";
import { motion } from 'framer-motion'; 
import { containerVariants, itemVariants } from '@/utils/framer-variants';

const Employee = () => {

    const { isFirstLoading  } = useEmployeesContext();

    // const renderContent = (isSkeleton: boolean) => (
    //     <>
    //         <motion.div variants={itemVariants}>
    //             {/* O FieldsEmployee precisa ser um filho direto da motion.div */}
    //             {isSkeleton ? null : <FieldsEmployee />}
    //         </motion.div>
            
    //         <motion.div variants={itemVariants}>
    //             {isSkeleton ? null : <TableEmployee />}
    //         </motion.div>
    //     </>
    // );

    return (
        <div className="mt-10 mx-10">
            <h1 className="font-bold text-3xl mb-2">
                Lista de Funcionários
            </h1>
            <p className="text-gray-500 mb-7">
                Gerencie todos os funcionários da sua empresa
            </p>

            <motion.div 
                key={isFirstLoading  ? "skeleton" : "content"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4" 
            >
                {isFirstLoading  ? (
                    // Se estiver carregando, renderize o Skeleton
                    <EmployeesPageSkeleton />
                ) : (
                    // Se carregado, renderize o conteúdo real, animado por itemVariants
                    <>
                        <motion.div variants={itemVariants}>
                            <FieldsEmployee />
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <TableEmployee />
                        </motion.div>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default Employee;