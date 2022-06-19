import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
// import SocketsProvider from '../Chat/context/socket.context';

const Chat = ({ socket, currUser }) => {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        socketId: socket.id,
        room: 'chat',
        username: currUser,
        message: currentMessage,
        time: new Date(Date.now())
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: object) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent: any, index: number) => {
            return (
              <div 
                className="message"
                id={socket.id === messageContent.socketId ? 'you' : 'other'}
                key={index}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{moment(messageContent.time).fromNow()}</p>
                    <p id="author">{messageContent.username}</p>
                  </div>
                </div>
              </div>);
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input 
          type="text"
          value={currentMessage}
          placeholder="Enter a Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}  
        />
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  );
};

export default Chat;
