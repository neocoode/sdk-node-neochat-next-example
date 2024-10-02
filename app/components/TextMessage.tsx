import React from 'react';

interface TextMessageProps {
  answer: string;
  onTextClick: () => void;
  isSent: boolean;
}

const TextMessage: React.FC<TextMessageProps> = ({ answer, onTextClick, isSent }) => {
  return (
    <p className={`text-lg ${isSent ? "cursor-pointer hover:text-blue-400" : ""}`} onClick={isSent ? onTextClick : undefined}>
      {answer}
    </p>
  );
};

export default TextMessage;
