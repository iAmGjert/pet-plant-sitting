import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import ScrollToBottom from 'react-scroll-to-bottom';
// import SocketsProvider from '../Chat/context/socket.context';
import axios from 'axios';
import { changeView } from '../../state/features/chat/chatSlice';
import { setJobs } from '../../state/features/jobs/jobSlice';

interface receivedMessage {
  senderId: number,
  text: string,
  conversationId: number
}

const Chat = ({ socket }) => {
  const currUser = useAppSelector((state) => state.userProfile.value);
  const conversationId = useAppSelector((state) => state.chat.conversationId);
  const recipientId = useAppSelector((state) => state.chat.recipientId);
  const isApplicant = useAppSelector((state) => state.chat.isApplicant);
  const [currentMessage, setCurrentMessage] = useState('');
  const applicant = useAppSelector((state) => state.chat.applicant);
  const [messageList, setMessageList] = useState([]);
  const dispatch = useAppDispatch();

  console.log(conversationId);
  console.log(recipientId);

  const getPastMessages = async () => {
    try {
      const pastMessages = await axios.get('/messages/past', {
        params: {
          conversationId: conversationId,
        }
      });

      console.log(pastMessages);
      setMessageList([...messageList, ...pastMessages.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        name: currUser.name,
        sender_id: currUser.id,
        receiver_id: recipientId,
        conversation_id: conversationId,
        text: currentMessage
      };

      socket.emit('send_message', {
        senderId: currUser.id,
        receiverId: recipientId,
        text: currentMessage,
        conversationId: conversationId,
      });

      // await socket.emit('send_message', messageData);
      try {
        const res = await axios.post('/messages', messageData);
        // const sender = await axios.get('/api/users/' + res.data.sender_id);
        // console.log('This line ran (2)', sender);
        // res.data.name = sender.data.name;
        setMessageList([...messageList, res.data]);
      } catch (error) {
        console.log(error);
      }
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  const acceptApplicant = async () => {
    await axios.patch('/api/jobs/' + applicant.job_id, {
      sitter_id: applicant.user_id
    });

    await axios.patch('/api/jobapplicants/' + applicant.user_id + '/' + applicant.job_id, {
      status: 'accepted'
    });

    const jobs = await axios.get('/api/jobs/all');

    dispatch(setJobs(jobs.data));
    dispatch(changeView('All'));
  };

  useEffect(() => {

    getPastMessages();


    // socket.on('receive_message', (data: object) => {
    //   setMessageList((list) => [...list, data]);
    // });
  }, []);

  useEffect(() => {
    socket.on('receive_message', async (data: receivedMessage) => {
      const sender = await axios.get('/api/users/' + data.senderId);
      const newMessage: { name: string; senderId: number; text: string; conversationId: number; createdAt: Date } = {
        name: sender.data.name,
        senderId: data.senderId,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: new Date(),
      };

      console.log('This line ran (1)', data);

      if (conversationId === newMessage.conversationId) {
        setMessageList((messageList) => [...messageList, newMessage]);
      }
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <button onClick={() => dispatch(changeView('All'))}>BACK</button>
      <div className="chat-body">
        <ScrollToBottom className="message-container">   
          {messageList.map((messageContent: any, index: number) => {
            return (
              <div 
                className="message"
                id={currUser.id === messageContent.sender_id ? 'you' : 'other'}
                key={index}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.text}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{moment(messageContent.createdAt).fromNow()}</p>
                    <p id="author">{messageContent.name}</p>
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
      <div>
        {isApplicant && <button onClick={acceptApplicant}>Accept</button>}
        {isApplicant && <button>Reject</button>}
      </div>
    </div>
  );
};

export default Chat;
