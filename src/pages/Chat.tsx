import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { Message } from "@/components/Chat/types";
import { N8N_WEBHOOK_URL, STATIC_CONTEXTO } from './staticContext';
import { DBStatusIndicator } from "@/components/Chat/DBStatusIndicator"; 

interface TableMessageType {
    colunas: string[];
    dados: string[][];
}

interface ChatMessage extends Message {
    tabela?: TableMessageType;
}

function TableMessage({ tabela }: { tabela: TableMessageType }) {
    return (
        <div className="overflow-x-auto border rounded-md mt-2">
            <table className="table-auto w-full text-left border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        {tabela.colunas.map((col, i) => (
                            <th key={i} className="px-4 py-2 border">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tabela.dados.map((linha, i) => (
                        <tr key={i} className="even:bg-gray-50">
                            {linha.map((celula, j) => (
                                <td key={j} className="px-4 py-2 border">
                                    {celula}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// CONVERTE O TEXTO DE LISTA GERADO PELA IA EM FORMATO DE TABELA
function processListToTable(rawText: string): ChatMessage | null {
    // Verifica se tem a estrutura básica de lista numerada
    if (!rawText.includes("1.") && !rawText.includes("2.")) {
        return null; 
    }

    // 1. Tenta separar o texto introdutório do corpo da lista.
    const introMatch = rawText.match(/^(.*?)\s*1\.\s*\*\*/s);
    const initialText = introMatch ? introMatch[1].trim() : 'Aqui está o resumo dos serviços em andamento:';
    
    // 2. Extrai os itens da lista, usando o número seguido por ponto e opcionalmente negrito como delimitador.
    // O regex /\s*(\d+)\.\s*\*\*/ divide antes de 'N. **' e remove o número.
    const listItems = rawText.split(/\s*(\d+)\.\s*\*\*/).filter(item => item.trim() && !/^\d+$/.test(item.trim()));

    if (listItems.length === 0) return null;

    // Colunas esperadas
    const colunas = ["Obra", "Serviço", "Etapa", "% Avanço", "Status", "Observações"];
    const dados: string[][] = [];

    // 3. Processa cada item da lista
    for (const item of listItems) {
        // A Obra é extraída no início do item (antes do primeiro ' - ')
        const obraMatch = item.match(/^(.*?)\s*-/);
        const obra = obraMatch ? obraMatch[1].trim().replace(/\*\*/g, '') : 'N/A';
        
        // Conteúdo restante do item para processar os pares chave/valor
        const itemContent = item.substring(obra.length).replace(/^-/, '').trim();

        // Inicializa a linha com valores padrão
        const linha: Record<string, string> = {
            "Obra": obra, 
            "Serviço": 'N/A', 
            "Etapa": 'N/A', 
            "% Avanço": 'N/A', 
            "Status": 'N/A', 
            "Observações": 'N/A'
        };

        // Extrai pares Chave: Valor
        // Regex para capturar padrões tipo: **Chave:** Valor -
        // Nota: Um segundo regex pode ser necessário se o final do valor não for um hífen.
        const pairs = itemContent.matchAll(/\*\*(.*?):\*\*\s*(.*?)\s*(?:-|\n|$)/g);

        // Lógica de observações fora do loop para ser mais robusta, já que ela é a última.
        if (itemContent.includes('Observações:')) {
             const obsMatch = itemContent.substring(itemContent.indexOf('Observações:')).trim();
             linha['Observações'] = obsMatch.replace('Observações:', '').trim();
        }

        for (const match of pairs) {
            const key = match[1].trim();
            let value = match[2].trim();

            // Mapeia chaves reconhecidas para as colunas
            if (colunas.includes(key)) {
                // Se a chave for Status, tenta limpar o valor se a observação tiver sido capturada junto
                if (key === 'Status' && linha['Observações'] !== 'N/A' && value.endsWith(linha['Observações'])) {
                    value = value.replace(linha['Observações'], '').trim();
                }
                
                linha[key] = value.replace(/^\./, '').replace(/^-$/, '').trim(); 
            }
        }
        
        // Formata a linha na ordem correta das colunas
        const dadosLinha = colunas.map(col => linha[col] || 'N/A');
        dados.push(dadosLinha);
    }

    if (dados.length > 0) {
        return {
            role: "assistant", 
            content: initialText, 
            tabela: { colunas, dados } 
        } as ChatMessage;
    }

    return null;
}
// ----------------------------------------------------------------------

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    async function handleSend() {
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = { role: "user", content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setLoading(true);

        try {
            const payload = {
                pergunta: inputValue,
                contexto: STATIC_CONTEXTO, 
            };
            console.log("-> Payload enviado para n8n:", payload);


            const response = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), 
            });
            
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("<- Resposta JSON recebida do n8n:", data);
            
            let raw: string = ""; 

            // --- LÓGICA DE EXTRAÇÃO RAW (Lida com String/Array) ---
            if (Array.isArray(data?.resposta) && data.resposta.length > 0) {
                raw = String(data.resposta[0].resposta || JSON.stringify(data.resposta[0]));
            } else if (typeof data?.resposta === 'string') {
                raw = data.resposta;
            } else {
                raw = String(data?.resposta || "A chave 'resposta' está ausente ou inválida.");
                console.error("DEBUG: 'resposta' não é uma string nem um array esperado. Retornou:", raw);
            }
            
            raw = raw.trim(); 

            if (!raw) {
                let emptyErrorMessage: ChatMessage = {
                    role: "assistant",
                    content: "A IA não retornou um texto de resposta na chave 'resposta'. Verifique a configuração do node 'Respond to Webhook' no n8n.",
                };
                setMessages(prev => [...prev, emptyErrorMessage]);
                return;
            }


            let aiMessage: ChatMessage;

            // 1. Tenta detectar o formato hasTable
            if (raw.startsWith("hasTable")) {
                const lines: string[] = raw.split("\n").map(line => line.trim());
                const textoLine = lines.find(line => line.startsWith("texto:")) || "";
                const colunasLine = lines.find(line => line.startsWith("colunas:")) || "";
                const linhasLine = lines.find(line => line.startsWith("linhas:")) || "";

                const texto = textoLine.replace("texto:", "").trim();
                const colunas = colunasLine
                    .replace("colunas:", "")
                    .split(",")
                    .map(c => c.trim())
                    .filter(Boolean);

                const dados: string[][] = [];
                const regex = /\[([^\]]+)\]/g;
                let match;
                while ((match = regex.exec(linhasLine)) !== null) {
                    const linha = match[1]
                        .split(",")
                        .map(c => c.trim())
                        .filter(Boolean);
                    dados.push(linha);
                }

                aiMessage = { role: "assistant", content: texto, tabela: { colunas, dados } };
            
            } else {
                // 2. Tenta converter o formato de lista (com 1., 2., etc.) em tabela
                const tableResult = processListToTable(raw);

                if (tableResult) {
                    aiMessage = tableResult;
                } else {
                    // 3. Usa como texto simples (fallback)
                    aiMessage = { role: "assistant", content: raw };
                }
            }

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Erro na requisição ou processamento da resposta:", error);

            const errorMessage: ChatMessage = {
                role: "assistant",
                content: `Ocorreu um erro ao tentar se comunicar com a IA: ${error instanceof Error ? error.message : "Erro desconhecido"}. Verifique o console.`,
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen h-full p-6 space-y-8 w-[90%] m-auto">
            <div className="flex flex-col h-full">
                {/* Cabeçalho */}
                <div className="space-y-1 mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Chat com IA</h1>
                        <p className="text-md text-gray-600 flex items-center gap-4">
                            Tire suas dúvidas com o agente IA
                            {/* <DBStatusIndicator /> */}
                        </p>
                    </div>
                </div>

                {/* Área do chat */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        ref={scrollRef}
                        className="h-[500px] border border-gray-500 rounded-md p-4 bg-white overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-md ${
                                        msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                                    } max-w-[70%]`}
                                >
                                    <div>{msg.content}</div>
                                    {msg.tabela && <TableMessage tabela={msg.tabela} />}
                                </div>
                            ))}
                            {loading && (
                                <div className="p-2 rounded-md bg-gray-100 self-start max-w-[70%] flex items-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4" /> Pensando...
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Campo de input */}
                <motion.div
                    className="flex gap-2 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <Input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 h-10 bg-white my-3 border border-gray-500"
                        disabled={loading}
                    />
                    <Button onClick={handleSend} disabled={loading} className="h-10 my-3">
                        Enviar
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}