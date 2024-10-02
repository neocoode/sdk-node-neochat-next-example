"use client"; // Marca o componente como Client Component

import { useState, useRef, useEffect } from "react";
import { WebClient, EEventType } from "@neocoode/sdk-neochat"; // Certifique-se de que o pacote está configurado corretamente
import MessageList from "@/app/components/MessageList";
import ChatInput from "@/app/components/ChatInput";
import ChatStatus from "@/app/components/ChatStatus"; // Importar o novo componente ChatStatus
import { IAnswerDataSearch } from "@/app/interfaces/IAnswerDataSearch";

const HomeChat = () => {
  const [messages, setMessages] = useState<
    {
      messageId: string;
      answer: string;
      searchs?: IAnswerDataSearch[];
      typeMessage: "sent" | "received";
      type: "Search" | "Answer" | "Question" | "Keyword";
    }[]
  >([]);

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
          console.log("Dados recebidos:", parsedData);
  
          if (
            parsedData &&
            typeof parsedData === "object" &&
            "messageId" in parsedData &&
            "answer" in parsedData
          ) {
            // Cria a nova mensagem
            const newMessage = {
              messageId: parsedData.messageId,
              answer: parsedData.answer,
              type: parsedData.type as "Answer" | "Question" | "Keyword" | "Search", // Certifica-se de que o tipo seja um dos tipos esperados
              typeMessage: "received" as "sent" | "received",
              searchs: parsedData.type === "Search" ? parsedData?.searchs : undefined, // Adiciona os resultados de pesquisa se o tipo for 'Search'
            };

            console.log('newMessage', newMessage)
  
            // Atualiza o estado com a nova mensagem
            setMessages((prevMessages) => [...prevMessages, newMessage]);
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
        console.log(`[Conexão]: ${data}`);
        break;
      case EEventType.CLOSE:
        console.log(`[Fechamento]: ${data}`);
        break;
      case EEventType.ERROR:
        console.log(`[Erro]: ${data}`);
        break;
      default:
        console.log(`[Desconhecido]: ${data}`);
    }
  };

  const sendMessage = (messageContent: string) => {
    try {
      const wsOptions = {
        wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost", // Vindo da variável de ambiente
        wsPort: process.env.NEXT_PUBLIC_WS_PORT || "3525", // Porta do WebSocket
        maxReconnectAttempts:
          Number(process.env.NEXT_PUBLIC_WS_MAX_RECONNECT_ATTEMPTS) || 5,
        reconnectInterval:
          Number(process.env.NEXT_PUBLIC_WS_RECONNECT_INTERVAL) || 3000,
        timeoutDuration: 30000, // Um valor padrão ou pode ser vindo das envs
        debug: process.env.NEXT_PUBLIC_DEBUG === "true", // Debug habilitado via variável
      };

      // Cria uma nova instância de WebClient com o chatId (se houver) e a adiciona ao array
      const newClient = new WebClient(
        onMessageReceived,
        wsOptions,
        onEvent,
        chatId || undefined
      );
      clientsRef.current.push(newClient);

      if (messageContent.trim()) {
        newClient.sendMessage(messageContent);

        // Adiciona a mensagem enviada ao estado
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            messageId: `${Date.now()}`,
            answer: messageContent,
            typeMessage: "sent",
            type: "Question",
          }, // Adiciona a mensagem enviada pelo usuário
        ]);
        setMessage(""); // Limpa o campo de mensagem após o envio
      }
    } catch (error) {
      console.error("Erro ao inicializar WebClient:", error);
    }
  };

  // Desabilitar o scroll da página inteira
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Desabilita o scroll no body
    return () => {
      document.body.style.overflow = ""; // Restaura o scroll no body ao desmontar
    };
  }, []);

  const onSendMessageKeyword = (keyword: string) => {
    // Envia diretamente a palavra-chave sem esperar a atualização do estado
    sendMessage(keyword);
  };

  return (
    <div
      className="w-full h-screen flex flex-col bg-gray-900 text-white"
      style={{ padding: "0 0" }}
    >
      <div className="flex flex-col h-full overflow-y-auto mb-4 pb-20 px-10">
        <ChatStatus chatId={chatId} />
        <MessageList
          messages={messages}
          scrollRef={messagesEndRef}
          onSendMessageKeyword={onSendMessageKeyword} // Passa o manipulador de clique de keyword para MessageList
        />
      </div>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={() => sendMessage(message)}
      />
    </div>
  );
};

export default HomeChat;
