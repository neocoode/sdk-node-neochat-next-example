import React from 'react';
import { IChatMessageProps } from '@/app/interfaces/IChatMessageProps';
import Keywords from './Keywords';
import SearchResults from './SearchResults';
import TextMessage from './TextMessage';

const ReceivedMessage: React.FC<IChatMessageProps> = ({ messageId, answer, type, searchs, onSendMessageKeyword }) => {
  return (
    <li className="relative px-2 pt-1 pb-2 rounded-lg w-[80%] bg-gray-700 self-start text-left mr-auto">
      {type === 'Keyword' ? (
        <Keywords keywordsString={answer} onSendMessageKeyword={onSendMessageKeyword} />
      ) : type === 'Search' && searchs ? (
        <SearchResults searchs={searchs} />
      ) : (
        <TextMessage answer={answer} onTextClick={() => onSendMessageKeyword(answer)} isSent={false} />
      )}
      <span className="right-2 bottom-2 text-xs text-gray-500">{messageId}</span>
    </li>
  );
};

export default ReceivedMessage;
