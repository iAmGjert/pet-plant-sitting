import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  changeView,
  getRecipientId,
  getConversationId,
  setIsApplicant,
  setApplicant,
} from '../../state/features/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Card } from 'react-bootstrap';

const Applicant = ({ applicant }: { applicant: any }) => {
  const [applicantUser, setApplicantUser] = useState({
    id: null,
    name: '',
    status: '',
    job_id: 0,
  });
  const [colorOfStatus, setColorOfStatus] = useState('red');
  const users = useAppSelector((state) => state.userProfile.users);
  const currUser = useAppSelector((state) => state.userProfile.value);
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const dispatch = useAppDispatch();

  const getApplicant = () => {
    const applicantUser = users.filter((user) => user.id === applicant.user_id);
    setApplicantUser(applicantUser[0]);
  };

  const handleClick = async () => {
    dispatch(getRecipientId(applicantUser.id));
    const conversation = await axios.get('/conversations', {
      params: {
        participant1_id: currUser.id,
        participant2_id: applicantUser.id,
      },
    });
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(setIsApplicant(true));
    dispatch(setApplicant(applicant));
    dispatch(changeView('Chat'));
  };

  const getOnlineStatus = () => {
    let isOnline = false;

    // console.log(usersOnline);

    for (let i = 0; i < usersOnline.length; i++) {
      if (usersOnline[i].userId === applicantUser.id) {
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
    getApplicant();
    getOnlineStatus();
  }, [users, usersOnline]);

  return (
    <Container>
      <Card className='chat-card'>
        <Card.Body>
          <div
            onClick={handleClick}
            onKeyPress={() => {
              return;
            }}
            role='button'
            tabIndex={0}
          >
            {applicantUser.name}
            <span className='circle' style={{ color: colorOfStatus }}></span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Applicant;
