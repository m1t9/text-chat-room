import React, { useState } from "react";

import "./ChatRoom.css";
import useChat from "../../helpers/useChat";
import { useHistory } from "react-router-dom";
import InfoBar from '../InfoBar';
import MessageBox from '../MessageBox';
import InputMessageForm from '../InputMessageForm';

const ChatRoom = (props) => {
  const { userName } = props;
  const { roomId } = props.match.params;
  const { messages, sendMessage, users } = useChat(roomId, userName);
  const [newMessage, setNewMessage] = useState('');

  let history = useHistory();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage,
      userName,
      Date.now());
    setNewMessage('');
  };

  const handleDelete = () => {
    props.onNameAdded(undefined);
    history.push(`/`);
  }

  return (
    <div className="chatRoom">
      <h2 className="chatHead">(^=◕ᴥ◕=^)</h2>
      <div>

        <InfoBar
          userName={userName}
          users={users}
          roomId={roomId}
          handleDelete={handleDelete}
        />

        <MessageBox messages={messages} />

        <InputMessageForm
          newMessage={newMessage}
          handleSendMessage={handleSendMessage}
          handleNewMessageChange={handleNewMessageChange}
        />

      </div>
    </div>
  );
};

export default ChatRoom;
