import { ENABLED_TAGS, IS_DEV_MODE, ALWAYS_ENABLED_TAGS, FORCE_LOG_IN_PROD } from './logConfig';

const LOG_PREFIX = "[APP_MONITOR]";

const isTagAllowed = (tag: string): boolean => {
    return ENABLED_TAGS.includes('ALL') || ENABLED_TAGS.includes(tag);
};

const isInfoEnabled = (tag: string): boolean => {
    // 1. Permite em produção se a flag de força estiver ativa
    if (FORCE_LOG_IN_PROD) return true;

    // 2. Bloqueia em Produção
    if (!IS_DEV_MODE) return false;

    // 3. Em Dev, verifica a lista de permissão (exceto se 'ALL' estiver ativo)
    return isTagAllowed(tag);
};

const isWarnEnabled = (tag: string): boolean => {
    // 1. Permite em DEV (não depende das tags para WARN)
    if (IS_DEV_MODE) return true;

    // 2. Permite em PROD se a flag de força OU a tag for de "sempre ativo"
    if (FORCE_LOG_IN_PROD || ALWAYS_ENABLED_TAGS.includes(tag)) return true;

    return false;
};

const isErrorEnabled = (tag: string): boolean => {
    // 1. Permite em DEV
    if (IS_DEV_MODE) return true;

    // 2. Permite em PROD se a flag de força OU a tag for de "sempre ativo"
    if (FORCE_LOG_IN_PROD || ALWAYS_ENABLED_TAGS.includes(tag)) return true;
    
    return false;
};

const logger = {
    /**
     * @param tag A categoria do log (ex: 'AUTH', 'PAGES:DASHBOARD')
     * @param message A mensagem principal do log
     * @param data Dados adicionais para inspeção
     */
    info: (tag: string, message: string, data?: any) => {
        if (!isInfoEnabled(tag)) return;

        console.log(
            `%c${LOG_PREFIX}%c [INFO] ${tag}: ${message}`, 
            'color: green; font-weight: bold;', 
            'color: unset;', 
            data || ''
        );
    },

    warn: (tag: string, message: string, data?: any) => {
        if (!isWarnEnabled(tag)) return; // 💡 Nova verificação

        console.warn(
            `%c${LOG_PREFIX}%c [WARN] ${tag}: ${message}`, 
            'color: orange; font-weight: bold;', 
            'color: unset;', 
            data || ''
        );
    },

    error: (tag: string, message: string, error?: any) => {
        if (!isErrorEnabled(tag)) return; // 💡 Nova verificação
        
        console.error(
            `%c${LOG_PREFIX}%c [ERROR] ${tag}: ${message}`, 
            'color: red; font-weight: bold;', 
            'color: unset;', 
            error || ''
        );
    },
};

export default logger;