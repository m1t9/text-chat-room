import React from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const InputMessageForm = ({ newMessage, handleNewMessageChange, handleSendMessage }) => {
  return (
    <InputGroup className="mb-3">

      <FormControl
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        autoFocus={true}
      />

      <InputGroup.Append>
        <Button
          onClick={handleSendMessage}
        >
          &#9658;
          </Button>
      </InputGroup.Append>

    </InputGroup>
  );
};

export default InputMessageForm;
