// src/utils/framer-variants.ts

import type { Variants } from 'framer-motion';

// Configuração principal para o container (A página inteira ou um bloco grande)
export const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        // Aplica um pequeno delay e escalonamento nos filhos
        transition: { delayChildren: 0.1, staggerChildren: 0.05 }
    }
};

// Configuração para itens individuais dentro do container (Cards, Fields, Tabela)
export const itemVariants: Variants = { 
    hidden: { opacity: 0, y: 10 }, 
    visible: { opacity: 1, y: 0 } 
};