import React from "react";
import { Badge } from 'react-bootstrap';

const InfoBar = ({ userName, users, roomId, handleDelete }) => {
  return (
    <>
      <span> User </span>
      <Badge variant="primary">{userName}</Badge>{' '}

      <Badge
        variant="danger"
        className="deleteName"
        onClick={handleDelete}
      >
        <span className="tooltiptext">Exit</span>
          &#x2715;
        </Badge>{' '}

      <div>
        <span> Room </span>
        <Badge variant="warning">{roomId}</Badge>
      </div>

      <div>
        Online:
          {
          users[roomId].map((user) => (
            <Badge key={user} variant="success" className="onlineUsers">{user}</Badge>
          ))
        }
      </div>
    </>
  );
};

export default InfoBar;
