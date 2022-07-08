import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  changeView,
  getRecipientId,
  getConversationId,
  setIsApplicant,
} from '../../state/features/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Card } from 'react-bootstrap';

const ConfirmedClient = ({ job }: { job: any }) => {
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

  const getOnlineStatus = () => {
    let isOnline = false;

    // console.log(usersOnline);

    for (let i = 0; i < usersOnline.length; i++) {
      if (usersOnline[i].userId === client.id) {
        isOnline = true;
      }
    }

    if (isOnline === true) {
      setColorOfStatus('green');
    } else {
      setColorOfStatus('red');
    }
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

  useEffect(() => {
    getClient();
    getOnlineStatus();
  }, [users, usersOnline]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <h6>{job.startDate}</h6>
          <div
            onClick={handleClick}
            onKeyPress={() => {
              return;
            }}
            role='button'
            tabIndex={0}
          >
            {client.name}
            <span className='circle' style={{ color: colorOfStatus }}></span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConfirmedClient;
