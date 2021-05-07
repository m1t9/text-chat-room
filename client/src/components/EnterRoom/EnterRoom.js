import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import './EnterRoom.css';

const EnterRoom = () => {

  let history = useHistory();
  const [roomName, setRoomName] = React.useState('');

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleKeyPress = () => {
    history.push(`/${roomName}`);
  };

  return (
    <div className='enterRoom'>

      <h1>
        Welcome to the Chat (◕‿◕)
      </h1>

      <h3>
        Please, enter Room name
      </h3>

      <InputGroup className='mb-3'>

        <FormControl
          placeholder='Room name'
          onChange={handleRoomNameChange}
          value={roomName}
          onKeyPress={(e) => e.key === 'Enter' ? handleKeyPress(e.target) : null}
          autoFocus={true}
        />

        <InputGroup.Append>
          <Link to={`/${roomName}`} className='btn btn-primary'>
            Join room
          </Link>
        </InputGroup.Append>
      </InputGroup>

    </div>
  );
};

export default EnterRoom;
