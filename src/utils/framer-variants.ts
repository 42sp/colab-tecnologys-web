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
    hidden: { opacity: 0, y: 10,}, 
    visible: { opacity: 1, y: 0 } 
};

export const tableRowFadeInVariants: Variants = {
    hidden: { 
        opacity: 0,
        // O uso de escala no eixo X não afeta o layout vertical, mas adiciona um efeito sutil
        scaleX: 0.98
    },
    visible: { 
        opacity: 1, 
        scaleX: 1,
        transition: { 
            duration: 0.4, 
            ease: "easeOut" 
        } 
    }
};