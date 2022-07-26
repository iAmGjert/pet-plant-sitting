import React, { useState, useEffect } from 'react';
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

interface jobApplicant {
  user_id: number;
  job_id: number;
  status: string;
  user: {
    name: string;
    image: string;
  };
}

const AcceptedApplicant = ({
  accepted_applicant,
  job,
}: {
  accepted_applicant: Array<jobApplicant>;
  job: any;
}) => {
  const [hired, setHired] = useState({
    id: null,
    name: '',
  });
  const [colorOfStatus, setColorOfStatus] = useState('red');
  const users = useAppSelector((state) => state.userProfile.users);
  const currUser = useAppSelector((state) => state.userProfile.value);
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  const dispatch = useAppDispatch();

  // console.log(usersOnline);

  const getProfileOfHired = () => {
    if (accepted_applicant.length > 0) {
      const profileOfHired = users.filter(
        (user) => user.id === accepted_applicant[0].user_id
      );
      setHired(profileOfHired[0]);
    }
  };

  const getOnlineStatus = () => {
    let isOnline = false;

    // console.log(usersOnline);

    for (let i = 0; i < usersOnline.length; i++) {
      if (usersOnline[i].userId === accepted_applicant[0].user_id) {
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
    dispatch(getRecipientId(hired.id));
    const conversation = await axios.get('/conversations', {
      params: {
        participant1_id: currUser.id,
        participant2_id: hired.id,
      },
    });
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(setIsApplicant(false));
    dispatch(changeView('Chat'));
  };

  useEffect(() => {
    getProfileOfHired();
    getOnlineStatus();
  }, [usersOnline]);

  return (
    <Container>
      <Card className='chat-card bootstrap-card'>
        <Card.Body>
          <h6>{job.startDate}</h6>
          <h6>Description: {job.description}</h6>
          <div
            onClick={handleClick}
            onKeyPress={() => {
              return;
            }}
            role='button'
            tabIndex={0}
          >
            {hired.name}
            <span className='circle' style={{ color: colorOfStatus }}></span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AcceptedApplicant;
