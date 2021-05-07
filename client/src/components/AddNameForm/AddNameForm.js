import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import './AddNameForm.css';

const AddNameForm = ({ onNameAdded }) => {
  const [userName, setUserName] = useState('');

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  return (
    <div className="setName">
      <h1>
        Welcome to the Chat (◕‿◕)
      </h1>

      <h2>Please, write your name</h2>
      
      <InputGroup className="mb-3">

        <FormControl
          value={userName}
          onChange={onUserNameChange}
          placeholder="User name"
          onKeyPress={(e) => e.key === 'Enter' ? onNameAdded(userName) : null}
          autoFocus={true}
        />

        <InputGroup.Append>
          <Button
            onClick={() => onNameAdded(userName)}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>

    </div>
  );
}

export default AddNameForm;
