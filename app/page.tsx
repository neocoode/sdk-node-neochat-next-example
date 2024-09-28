"use client"; // Marca o componente como Client Component

import { useState, useRef, useEffect } from "react";
import { WebClient, EEventType } from "@neocoode/sdk-neochat"; // Certifique-se de que o pacote está configurado corretamente
import WebSocketStatus from "@/app/components/WebSocketStatus";
import MessageList from "@/app/components/MessageList";
import ChatInput from "@/app/components/ChatInput";
import ChatStatus from "@/app/components/ChatStatus"; // Importar o novo componente ChatStatus

const HomeChat = () => {
  const [messages, setMessages] = useState<{ messageId: string; answer: string; type: "sent" | "received" }[]>([]);
  const [status, setStatus] = useState<string>("Conectando...");
  const [message, setMessage] = useState<string>(""); // Estado para a mensagem a ser enviada
  const [chatId, setChatId] = useState<string | null>(null); // Estado para armazenar o chatId
  const clientsRef = useRef<WebClient[]>([]); // Armazena múltiplas instâncias de WebClient
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referência para o fim da lista de mensagens

  const onMessageReceived = {
    onSuccess: (data: any, newChatId?: string) => {
      try {
        // Se o chatId vier na mensagem, atualiza o estado
        if (newChatId) {
          setChatId(newChatId);
        }

        // Verifica se a estrutura do dado recebido é correta e contém `messageId` e `answer`
        if (typeof data === "string") {
          const parsedData = JSON.parse(data);

          if (parsedData && typeof parsedData === "object" && "messageId" in parsedData && "answer" in parsedData) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { messageId: parsedData.messageId, answer: parsedData.answer, type: "received" },
            ]);
          }
        }
      } catch (error) {
        console.error("Erro ao processar JSON:", error);
      }
    },
    onError: (error: string) => {
      console.error("Erro ao processar a mensagem:", error);
    },
  };

  const onEvent = (type: EEventType, data: string) => {
    switch (type) {
      case EEventType.CONNECTION:
        setStatus(`[Conexão]: ${data}`);
        break;
      case EEventType.CLOSE:
        setStatus(`[Fechamento]: ${data}`);
        break;
      case EEventType.ERROR:
        setStatus(`[Erro]: ${data}`);
        break;
      default:
        console.log(`[Desconhecido]: ${data}`);
    }
  };

  const sendMessage = () => {
    try {
      const wsOptions = {
        wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost", // Vindo da variável de ambiente
        wsPort: process.env.NEXT_PUBLIC_WS_PORT || "3525", // Porta do WebSocket
        maxReconnectAttempts: Number(process.env.NEXT_PUBLIC_WS_MAX_RECONNECT_ATTEMPTS) || 5,
        reconnectInterval: Number(process.env.NEXT_PUBLIC_WS_RECONNECT_INTERVAL) || 3000,
        timeoutDuration: 30000, // Um valor padrão ou pode ser vindo das envs
        debug: process.env.NEXT_PUBLIC_DEBUG === "true", // Debug habilitado via variável
      };

      // Cria uma nova instância de WebClient com o chatId (se houver) e a adiciona ao array
      const newClient = new WebClient(onMessageReceived, wsOptions, onEvent, chatId || undefined);
      clientsRef.current.push(newClient);

      if (message.trim()) {
        newClient.sendMessage(message);

        // Adiciona a mensagem enviada ao estado
        setMessages((prevMessages) => [
          ...prevMessages,
          { messageId: `${Date.now()}`, answer: message, type: "sent" }, // Adiciona a mensagem enviada pelo usuário
        ]);
        setMessage(""); // Limpa o campo de mensagem após o envio
      }
    } catch (error) {
      console.error("Erro ao inicializar WebClient:", error);
    }
  };


  // Desabilitar o scroll da página inteira
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Desabilita o scroll no body
    return () => {
      document.body.style.overflow = ''; // Restaura o scroll no body ao desmontar
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white" style={{ padding: "0 0" }}>
      {/* <WebSocketStatus status={status} /> */}
      <div className="flex flex-col h-full overflow-y-auto mb-4 pb-20 px-10">
        <ChatStatus chatId={chatId} /> 
        <MessageList messages={messages} scrollRef={messagesEndRef} /> 
      </div>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}  />
    </div>
  );
};

export default HomeChat;
