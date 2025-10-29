import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { Message } from "@/components/Chat/types";
import { N8N_WEBHOOK_URL, STATIC_CONTEXTO } from "./staticContext";

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
    setMessages((prev) => [...prev, userMessage]);
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
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Erro de rede: ${response.status} ${response.statusText}`
        );
      }

      // Recebe a resposta do n8n (que deve conter a string JSON da IA)
      const data = await response.json();
      console.log("<- Resposta JSON recebida do n8n:", data);

      let rawJsonString: string = "";

      // Lógica para extrair a string JSON do corpo da resposta do Webhook
      if (Array.isArray(data?.resposta) && data.resposta.length > 0) {
        // Tenta pegar a string JSON do primeiro item do array (formato comum do n8n)
        rawJsonString = String(
          data.resposta[0].resposta || JSON.stringify(data.resposta[0])
        );
      } else if (typeof data?.resposta === "string") {
        rawJsonString = data.resposta;
      } else if (typeof data === "string") {
        rawJsonString = data;
      } else {
        // Fallback, tenta tratar o objeto data inteiro como a resposta
        rawJsonString = JSON.stringify(data);
      }

      rawJsonString = rawJsonString.trim();

      if (!rawJsonString) {
        throw new Error(
          "A IA não retornou uma string JSON válida na resposta."
        );
      }

      // --- 1. Tenta PARSEAR o JSON ---
      let parsedData: any;
      try {
        parsedData = JSON.parse(rawJsonString);
      } catch (jsonError) {
        // Se o JSON estiver embrulhado em blocos de código markdown (```json ... ```)
        const match = rawJsonString.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (match && match[1]) {
          parsedData = JSON.parse(match[1]);
        } else {
          throw new Error(
            "Resposta da IA não é um JSON válido e não pôde ser extraída."
          );
        }
      }

      // --- 2. Valida e Extrai a Estrutura (resposta_formatada.messages) ---
      const messagesArray = parsedData?.resposta_formatada?.messages;

      if (!Array.isArray(messagesArray)) {
        // Se o JSON não seguir o formato esperado, trata a string bruta como texto
        const textMessage: ChatMessage = {
          role: "assistant",
          content:
            "Erro de parsing: A estrutura 'resposta_formatada.messages' não foi encontrada. Resposta bruta: " +
            rawJsonString,
        };
        setMessages((prev) => [...prev, textMessage]);
        return;
      }

      // --- 3. Mapeia a Array 'messages' para o estado do React (múltiplas mensagens) ---
      const newMessages: ChatMessage[] = [];

      messagesArray.forEach((msg: any) => {
        if (msg.type === "text" && msg.content) {
          newMessages.push({
            role: "assistant",
            content: String(msg.content).trim(),
          });
        } else if (
          msg.type === "table" &&
          Array.isArray(msg.columns) &&
          Array.isArray(msg.rows)
        ) {
          // Adiciona a mensagem de tabela
          newMessages.push({
            role: "assistant",
            // O campo 'title' do JSON se torna o 'content' da mensagem (texto acima da tabela)
            content: String(msg.title || "Tabela de dados:").trim(),
            tabela: {
              colunas: msg.columns.map(String),
              dados: msg.rows.map((row: string[]) => row.map(String)),
            },
          });
        }
      });

      if (newMessages.length === 0) {
        const textMessage: ChatMessage = {
          role: "assistant",
          content:
            "Nenhum bloco de 'text' ou 'table' válido foi encontrado na array 'messages'.",
        };
        setMessages((prev) => [...prev, textMessage]);
        return;
      }

      // Adiciona todos os blocos (texto e tabela) como mensagens separadas no chat
      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error("Erro na requisição ou processamento da resposta:", error);

      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Ocorreu um erro ao processar a resposta da IA: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }. Verifique o console para mais detalhes.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
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
                    msg.role === "user"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100 self-start"
                  } max-w-[70%]`}
                >
                  {/* Exibe o conteúdo (texto conversacional ou título da tabela) */}
                  {msg.content && <div>{msg.content}</div>}
                  {/* Renderiza a tabela se o objeto 'tabela' estiver presente */}
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
            onChange={(e) => setInputValue(e.target.value)}
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
