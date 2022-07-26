import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  changeView,
  getRecipientId,
  getConversationId,
  setIsApplicant,
} from '../../state/features/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Card } from 'react-bootstrap';

const PendingClient = ({ job }: { job: any }) => {
  const [client, setClient] = useState({
    id: null,
    name: '',
  });
  const [colorOfStatus, setColorOfStatus] = useState('red');
  const users = useAppSelector((state) => state.userProfile.users);
  const dispatch = useAppDispatch();
  const currUser = useAppSelector((state) => state.userProfile.value);
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);

  const getClient = () => {
    const client = users.filter((user) => user.id === job.employer_id);

    setClient(client[0]);
  };

  const handleClick = async () => {
    dispatch(getRecipientId(client.id));
    const conversation = await axios.get('/conversations', {
      params: {
        participant1_id: currUser.id,
        participant2_id: client.id,
      },
    });
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(setIsApplicant(false));
    dispatch(changeView('Chat'));
  };

  const getOnlineStatus = () => {
    let isOnline = false;

    // console.log(usersOnline);

    for (let i = 0; i < usersOnline.length; i++) {
      if (usersOnline[i].userId === client?.id) {
        isOnline = true;
      }
    }

    if (isOnline === true) {
      setColorOfStatus('green');
    } else {
      setColorOfStatus('red');
    }
  };

  useEffect(() => {
    getClient();
    getOnlineStatus();
  }, [users, usersOnline]);

  return (
    <Container>
      <Card className='chat-card bootstrap-card'>
        <Card.Body>
          <div
            onClick={handleClick}
            onKeyPress={() => {
              return;
            }}
            role='button'
            tabIndex={0}
          >
            Name: {client?.name}
            <span className='circle' style={{ color: colorOfStatus }}></span>
          </div>
          <h6 className='pending-client-start-date'>
            Sitting Start Date:{' '}
            {moment(job.startDate).format('dddd, MMMM Do YYYY')}
          </h6>
          <h6 className='pending-client-description'>Sitting Description:</h6>
          <h6>{job.description}</h6>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PendingClient;
