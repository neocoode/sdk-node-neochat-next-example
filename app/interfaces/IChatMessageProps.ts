import { IAnswerDataSearch } from "@/app/interfaces/IAnswerDataSearch";

export interface IChatMessageProps {
    messageId: string;
    answer: string;
    type: "Search" | "Answer" | "Question" | "Keyword";
    typeMessage: "sent" | "received";
    onSendMessageKeyword: (message: string) => void;
    searchs?: IAnswerDataSearch[]; // Propriedade opcional para os resultados de busca
  }