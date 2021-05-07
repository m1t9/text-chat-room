import React, { useRef, useEffect } from "react";
import { Toast } from 'react-bootstrap';


const MessageBox = ({ messages }) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <>
      <div className='messageBox'>

        {messages.map((message, i) => (
          <div
            key={i}
            className={`messageItem ${message.ownedByCurrentUser ? 'right' : 'left'}`}
          >

            <Toast>
              <Toast.Header closeButton={false}>
                <strong className="mr-auto userName">{message.userName}</strong>
                <small>
                  {message.time}
                </small>
              </Toast.Header>
              <Toast.Body>{message.body}</Toast.Body>
            </Toast>

          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </>
  )
}

export default MessageBox;
