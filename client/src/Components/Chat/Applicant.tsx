import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { changeView, getRecipientId, getConversationId, setIsApplicant } from '../../state/features/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const Applicant = ({ applicant }: {applicant: any}) => {
  const [applicantUser, setApplicantUser] = useState({
    id: null,
    name: '',
  });
  const users = useAppSelector((state) => state.userProfile.users);
  const dispatch = useAppDispatch();
  const currUser = useAppSelector((state) => state.userProfile.value);

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
      }
    });
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(setIsApplicant(true));
    dispatch(changeView('chat'));
  };

  useEffect(() => {
    getApplicant();
  });

  return (
    <div>
      <div onClick={handleClick} onKeyPress={() => { return; }} role='button' tabIndex={0}>
        {applicantUser.name}
      </div>
    </div>
  );
};

export default Applicant;
