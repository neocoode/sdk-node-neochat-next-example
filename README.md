Aqui está uma breve descrição de como utilizar o SDK `@neocoode/sdk-neochat` no projeto Next.js e o código completo do exemplo para ser incluído no seu README:

---

## Utilizando o SDK `@neocoode/sdk-neochat` no Next.js

O SDK `@neocoode/sdk-neochat` permite a criação de clientes WebSocket para comunicação em tempo real. No exemplo abaixo, o SDK é integrado em uma aplicação **Next.js** para implementar um chat dinâmico e interativo.

### Etapas do processo:

1. **Instanciação do WebClient**: Cada mensagem enviada cria uma nova instância de `WebClient`, que gerencia a comunicação via WebSocket. Se houver um `chatId`, ele é reaproveitado nas instâncias subsequentes.
2. **Múltiplas conexões**: Utilizando um `useRef`, o componente mantém o controle de múltiplas conexões WebSocket ativas.
3. **Envio de mensagens**: O componente permite que o usuário envie mensagens com um simples `Cmd + Enter` ou `Ctrl + Enter`. Cada mensagem enviada é registrada no estado e exibida na interface do usuário.
4. **Recebimento de mensagens**: As mensagens recebidas são processadas e exibidas, utilizando o callback `onSuccess` para atualizar a lista de mensagens.
5. **Gerenciamento de eventos**: A conexão WebSocket é monitorada, e os eventos de conexão, fechamento e erro são tratados apropriadamente.

### Exemplo de código utilizando o SDK

```tsx
"use client"; // Marca o componente como Client Component

import { useState, useRef } from "react";
import { WebClient, EEventType } from "@neocoode/sdk-neochat"; // Certifique-se de que o pacote está configurado corretamente
import WebSocketStatus from "@/app/components/WebSocketStatus";
import MessageList from "@/app/components/MessageList";
import ChatInput from "@/app/components/ChatInput";

const HomeChat = () => {
  const [messages, setMessages] = useState<{ messageId: string; answer: string; type: "sent" | "received" }[]>([]);
  const [status, setStatus] = useState<string>("Conectando...");
  const [message, setMessage] = useState<string>(""); // Estado para a mensagem a ser enviada
  const [chatId, setChatId] = useState<string | null>(null); // Estado para armazenar o chatId
  const clientsRef = useRef<WebClient[]>([]); // Armazena múltiplas instâncias de WebClient

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Se o usuário pressionar Cmd/Ctrl + Enter, envia a mensagem
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white" style={{ padding: "0 50px" }}>
      <WebSocketStatus status={status} />
      <MessageList messages={messages} />
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} handleKeyPress={handleKeyPress} />
    </div>
  );
};

export default HomeChat;
```

---

### Adicionando ao `README`

Essa seção pode ser adicionada ao seu README para que outros desenvolvedores saibam como utilizar o SDK no projeto:

### Utilizando o SDK `@neocoode/sdk-neochat`

Este projeto utiliza o SDK `@neocoode/sdk-neochat` para gerenciar a comunicação WebSocket. Abaixo está um exemplo de como configurar o SDK em um componente de chat:

- O SDK é instanciado para cada mensagem enviada, gerenciando múltiplas sessões de WebSocket.
- A cada mensagem, o componente verifica se um `chatId` já existe e, caso contrário, ele é criado e utilizado nas próximas mensagens.
- O componente suporta a reconexão automática e exibe o status atual da conexão.

Para usar o SDK, basta importar o `WebClient` e gerenciar os eventos WebSocket diretamente no componente:

```tsx
import { WebClient, EEventType } from "@neocoode/sdk-neochat";
```

Siga o exemplo acima para implementar e customizar a funcionalidade conforme suas necessidades.

