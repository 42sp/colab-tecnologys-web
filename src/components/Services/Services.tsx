// src/pages/Services/Services.tsx (ou o caminho correto do seu componente)

// import './style.css'; // Mantenha, se necessário

import TableServices from "@/components/Services/TableServices";
import FieldsServices from "./FieldsServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/framer-variants"; 

const Services = () => {
    return (
        <motion.div 
            className="min-h-screen px-5 py-5 h-full bg-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} >
                <FieldsServices />
            </motion.div>

            <TableServices />
        </motion.div>
    );
}

export default Services;