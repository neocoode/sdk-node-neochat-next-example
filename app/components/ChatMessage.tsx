import React from 'react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import { IChatMessageProps } from '@/app/interfaces/IChatMessageProps';

const ChatMessage: React.FC<IChatMessageProps> = (props) => {
  return props.typeMessage === "sent" ? (
    <SentMessage {...props} />
  ) : (
    <ReceivedMessage {...props} />
  );
};

export default ChatMessage;
