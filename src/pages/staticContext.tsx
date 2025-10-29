// staticContext.ts

export const N8N_WEBHOOK_URL = "https://evolution-n8n.eorpdr.easypanel.host/webhook-test/f6ddc488-8680-4351-84dd-d9e73b2d102d";

export const STATIC_CONTEXTO = {
    "obras": [
        {
            "id": "OBR-2025-001",
            "nome": "Residencial Parque das Flores",
            "servico": "Alvenaria",
            "cidade": "São Paulo",
            "situacao_atual": {
                "etapa_atual": "Execução do 12º pavimento",
                "andares_concluidos": 10,
                "andares_totais": 15,
                "percentual_avanco": 67,
                "produtividade_media_m2_por_homem_dia": 9.8,
                "status": "Dentro do prazo",
                "observacoes": "Leve redução de produtividade nas últimas duas semanas devido à chuva"
            }
        },
        {
            "id": "OBR-2025-002",
            "nome": "Torres do Bosque",
            "servico": "Estrutura Metálica",
            "cidade": "Rio de Janeiro",
            "situacao_atual": {
                "etapa_atual": "Montagem do telhado",
                "andares_concluidos": 8,
                "andares_totais": 8,
                "percentual_avanco": 95,
                "produtividade_media_m2_por_homem_dia": 15.5,
                "status": "Atrasado (3 dias)",
                "observacoes": "Atraso na entrega de vigas especializadas no RJ"
            }
        },
        {
            "id": "OBR-2025-003",
            "nome": "Edifício Comercial Alpha",
            "servico": "Instalações Hidráulicas",
            "cidade": "Belo Horizonte",
            "situacao_atual": {
                "etapa_atual": "Teste de pressão",
                "andares_concluidos": 5,
                "andares_totais": 12,
                "percentual_avanco": 45,
                "produtividade_media_m2_por_homem_dia": 7.1,
                "status": "No prazo",
                "observacoes": "Equipe com produtividade estável."
            }
        }
    ],
    "producao_mensal_equipe_elevacao": [
        { "mes": "Janeiro", "producao_total_m2": 2010, "pedreiros": 5, "produtividade_media_m2_por_pedreiro": 402 },
        { "mes": "Fevereiro", "producao_total_m2": 2150, "pedreiros": 5, "produtividade_media_m2_por_pedreiro": 430 },
        { "mes": "Março", "producao_total_m2": 2350, "pedreiros": 6, "produtividade_media_m2_por_pedreiro": 391 },
        { "mes": "Abril", "producao_total_m2": 2400, "pedreiros": 6, "produtividade_media_m2_por_pedreiro": 400 },
        { "mes": "Maio", "producao_total_m2": 2600, "pedreiros": 6, "produtividade_media_m2_por_pedreiro": 433 },
        { "mes": "Junho", "producao_total_m2": 2480, "pedreiros": 6, "produtividade_media_m2_por_pedreiro": 413 },
        { "mes": "Julho", "producao_total_m2": 2760, "pedreiros": 6, "produtividade_media_m2_por_pedreiro": 460 },
        { "mes": "Agosto", "producao_total_m2": 2920, "pedreiros": 7, "produtividade_media_m2_por_pedreiro": 417 },
        { "mes": "Setembro", "producao_total_m2": 3100, "pedreiros": 7, "produtividade_media_m2_por_pedreiro": 443 },
        { "mes": "Outubro", "producao_total_m2": 3320, "pedreiros": 7, "produtividade_media_m2_por_pedreiro": 474 }
    ],
    "estimativa_conclusao_andar_tipo": {
        "area_media_andar_m2": 480,
        "produtividade_equipe_m2_por_dia": 95,
        "qtd_pedreiros": 7,
        "estimativa_dias_conclusao": 5
    },
    "evolucao_pedreiro_felipe_bela": [
        { "mes": "Janeiro", "producao_m2": 280, "dias_trabalhados": 20, "produtividade_m2_dia": 14.0 },
        { "mes": "Fevereiro", "producao_m2": 295, "dias_trabalhados": 19, "produtividade_m2_dia": 15.5 },
        { "mes": "Março", "producao_m2": 300, "dias_trabalhados": 21, "produtividade_m2_dia": 14.3 },
        { "mes": "Abril", "producao_m2": 305, "dias_trabalhados": 20, "produtividade_m2_dia": 15.25 },
        { "mes": "Maio", "producao_m2": 315, "dias_trabalhados": 22, "produtividade_m2_dia": 14.3 },
        { "mes": "Junho", "producao_m2": 310, "dias_trabalhados": 20, "produtividade_m2_dia": 15.5 },
        { "mes": "Julho", "producao_m2": 325, "dias_trabalhados": 21, "produtividade_m2_dia": 15.4 },
        { "mes": "Agosto", "producao_m2": 360, "dias_trabalhados": 22, "produtividade_m2_dia": 16.4 },
        { "mes": "Setembro", "producao_m2": 390, "dias_trabalhados": 21, "produtividade_m2_dia": 18.6 },
        { "mes": "Outubro", "producao_m2": 410, "dias_trabalhados": 22, "produtividade_m2_dia": 18.6 }
    ],
    "producao_individual_equipe_setembro": [
        { "nome": "Felipe Bela", "funcao": "Pedreiro", "producao_m2": 390, "dias_trabalhados": 21, "produtividade_m2_dia": 18.6 },
        { "nome": "Carlos Menezes", "funcao": "Pedreiro", "producao_m2": 370, "dias_trabalhados": 20, "produtividade_m2_dia": 18.5 },
        { "nome": "João Lima", "funcao": "Pedreiro", "producao_m2": 355, "dias_trabalhados": 21, "produtividade_m2_dia": 16.9 },
        { "nome": "José Prado", "funcao": "Servente", "producao_m2": 290, "dias_trabalhados": 21, "produtividade_m2_dia": 13.8 },
        { "nome": "Marcos Teles", "funcao": "Servente", "producao_m2": 280, "dias_trabalhados": 20, "produtividade_m2_dia": 14.0 },
        { "nome": "Paulo Ramos", "funcao": "Pedreiro", "producao_m2": 315, "dias_trabalhados": 19, "produtividade_m2_dia": 16.6 },
        { "nome": "Ricardo Nunes", "funcao": "Encarregado", "producao_m2": 0, "dias_trabalhados": 0, "produtividade_m2_dia": 0 }
    ],
    "dimensionamento_ideal_equipe": {
        "meta_lajes_mes": 4,
        "area_total_meta_m2": 1920,
        "produtividade_media_pedreiro_m2_mes": 442,
        "qtd_pedreiros_atual": 7,
        "producao_total_equipe_m2_mes": 3094,
        "status": "Meta atendida",
        "dimensionamento_ideal_caso_reducao_20": 8
    },
    "alertas_recentes": [
        {
            "id_obra": "OBR-2025-001",
            "tipo": "Produtividade",
            "nivel": "Médio",
            "descricao": "Produtividade de João Lima (Pedreiro) caiu 10% na última semana. Requer monitoramento.",
            "data": "2025-10-25"
        },
        {
            "id_obra": "OBR-2025-002",
            "tipo": "Logística",
            "nivel": "Alto",
            "descricao": "Entrega das vigas de sustentação em atraso de 3 dias. Impacto direto no cronograma.",
            "data": "2025-10-28"
        },
        {
            "id_obra": "OBR-2025-003",
            "tipo": "Qualidade",
            "nivel": "Baixo",
            "descricao": "Ajuste fino necessário em duas conexões hidráulicas no 3º andar.",
            "data": "2025-10-27"
        }
    ],
    "comparativo_app_vs_realidade_aumentada": {
        "criterios": [
            {
                "nome": "Lançamento de produção",
                "app": "Feito pelo próprio pedreiro, simples e rápido",
                "ra": "Depende de supervisão técnica"
            },
            {
                "nome": "Atualização dos dados",
                "app": "Diária e automática (sincronização em nuvem)",
                "ra": "Pontual, após medições visuais"
            },
            {
                "nome": "Monitoramento",
                "app": "Produtividade individual e da equipe em tempo real",
                "ra": "Foco visual na execução"
            },
            {
                "nome": "Tomada de decisão",
                "app": "Baseada em métricas e históricos de desempenho",
                "ra": "Baseada em observação visual"
            },
            {
                "nome": "Custo operacional",
                "app": "Baixo (dispositivos móveis comuns)",
                "ra": "Alto (equipamentos e software específicos)"
            },
            {
                "nome": "Objetivo principal",
                "app": "Gestão e produtividade",
                "ra": "Visualização e planejamento 3D"
            }
        ],
        "conclusao": "O aplicativo permite que o próprio pedreiro registre sua produção diariamente, gerando dados objetivos e imediatos que melhoram o controle de produtividade e a tomada de decisão."
    }
};