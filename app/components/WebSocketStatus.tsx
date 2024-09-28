import React from 'react';

interface WebSocketStatusProps {
  status: string;
}

const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ status }) => {
  return (
    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
      Status da Conexão WebSocket: <span className="text-green-600">{status}</span>
    </h1>
  );
};

export default WebSocketStatus;
