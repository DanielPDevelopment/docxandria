import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLibrary } from 'contexts/libraries/LibraryContext';

// Determine WebSocket URL based on environment
const socketUrl = process.env.REACT_APP_DEVELOPMENT === 'true'
  ? process.env.REACT_APP_WEBSOKET_DEV
  : process.env.REACT_APP_WEBSOCKET_PROD;

/**
 * WebSocketComponent handles WebSocket connections and interactions.
 * Sends messages to the WebSocket server and logs responses.
 *
 * @component
 * @example
 * return (
 *   <WebSocketComponent message="Hello World" />
 * );
 */
const WebSocketComponent = ({ message }) => {
  const { activeLibraries, setActiveResults } = useLibrary();
  const terminalRef = useRef(null);
  const [transcribedMessage, setTranscribedMessage] = useState(message);
  const ws = useRef(null); // WebSocket reference to persist across renders

  // Effect to handle WebSocket messages
  useEffect(() => {
    setTranscribedMessage(message);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(transcribedMessage);
    } else {
      console.log(ws.current?.readyState);
    }
  }, [message, transcribedMessage]);

  // Effect to initialize and manage WebSocket connection
  useEffect(() => {
    let bufferedInput = '';
    
    try {
      if (terminalRef.current) {
        ws.current = new WebSocket(socketUrl);
        const dataToSend = {
          message: transcribedMessage,
          activeLibraries,
        };

        ws.current.onopen = () => {
          ws.current.send(JSON.stringify(dataToSend));
        };

        ws.current.onmessage = (event) => {
          // Handle incoming WebSocket messages
          console.log('Received message:', event.data);
        };

        ws.current.onclose = () => {
          console.log('WebSocket disconnected');
        };

        ws.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        // WebSocket does not have onpong event; this was added for example completeness
        ws.current.onpong = () => {
          console.log('Received pong from server');
        };

        return () => {
          if (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING) {
            ws.current.close();
          }
        };
      }
    } catch (err) {
      console.error('Error in WebSocket setup:', err);
    }
  }, [activeLibraries, transcribedMessage]);

  return (
    <div className="w-full h-full">
      <div ref={terminalRef} />
    </div>
  );
};

// PropTypes for WebSocketComponent
WebSocketComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default WebSocketComponent;
