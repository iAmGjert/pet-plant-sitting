import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
// import SocketsProvider from '../Chat/context/socket.context';

const Chat = ({ socket, username, room }) => {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        username: username,
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
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent: any, index: number) => {
          return (
            <div key={index}>
              <div>
                <div>
                  <p>{messageContent.message}</p>
                </div>
                <div>
                  <p>{moment(messageContent.time).fromNow()}</p>
                  <p>{messageContent.username}</p>
                </div>
              </div>
            </div>);
        })}
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
