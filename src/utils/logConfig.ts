export const ENABLED_TAGS: (string | 'ALL')[] = [
    // Liga todos os logs 
    // 'ALL', 
    
    // Context
    //'CONTEXT',
    //'AUTH',
    
    // Hooks
    //'CONSTRUCTION',
    
    // Pages
    //'DASHBOARD',

    // Components
    'CONSTRUCTION_MODAL',

];


export const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

export const FORCE_LOG_IN_PROD: boolean = false;

// Fontes que devem SEMPRE logar, mesmo em produção (ex: erros críticos)
export const ALWAYS_ENABLED_TAGS: string[] = ['AUTH:CRITICAL', 'API:ERROR'];