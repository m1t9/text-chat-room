import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import CONSTANTS from './CONSTATNS';

const useChat = (roomId, userName) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({
    [ roomId ]: [userName]
  });

  const socketRef = useRef();

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(CONSTANTS.SOCKET_SERVER_URL, {
      query: { roomId, userName },
      transports: ['websocket']
    });

    socketRef.current.emit(CONSTANTS.CONNECTED_USERS);

    // Listens for incoming messages
    socketRef.current.on(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(CONSTANTS.CONNECTED_USERS, (users) => {
      setUsers(users);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.emit(CONSTANTS.CONNECTED_USERS);
      socketRef.current.disconnect();
    };
  }, [roomId, userName]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody, userName, time) => {
    socketRef.current.emit(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      userName: userName,
      time: (new Date(time)).toLocaleTimeString('en-US'),
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage, users, socketRef };
};

export default useChat;
