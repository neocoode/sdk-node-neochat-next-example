import React from 'react';

interface KeywordsProps {
  keywordsString: string;
  onSendMessageKeyword: (keyword: string) => void;
}

const Keywords: React.FC<KeywordsProps> = ({ keywordsString, onSendMessageKeyword }) => {
  const keywordsArray = keywordsString.split(',').map(kw => kw.trim());

  return (
    <div>
      {keywordsArray.map((keyword, index) => (
        <span key={index}>
          <a href="#" onClick={() => onSendMessageKeyword(keyword)} className="text-blue-500 underline hover:text-blue-700">
            {keyword}
          </a>
          {index < keywordsArray.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
};

export default Keywords;
