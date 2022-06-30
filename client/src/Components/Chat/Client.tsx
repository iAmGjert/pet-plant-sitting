import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { changeView, getRecipientId, getConversationId, setIsApplicant } from '../../state/features/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const Client = ({job}: {job: any}) => {
  const [client, setClient] = useState({
    id: null,
    name: '',
  });
  const users = useAppSelector((state) => state.userProfile.users);
  const dispatch = useAppDispatch();
  const currUser = useAppSelector((state) => state.userProfile.value);

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
      }
    });
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(setIsApplicant(false));
    dispatch(changeView('chat'));
  };

  useEffect(() => {
    getClient();
  });

  return (
    <div>
      <h6>{job.startDate}</h6>
      <div onClick={handleClick} onKeyPress={() => { return; }} role='button' tabIndex={0}>
        {client.name}
      </div>
    </div>
  );
};

export default Client;