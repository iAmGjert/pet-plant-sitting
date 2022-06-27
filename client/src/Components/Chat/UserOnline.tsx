import React from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, getRecipientId, getConversationId } from '../../state/features/chat/chatSlice';
import axios from 'axios';


const UserOnline = ({userOnline}: {userOnline: any}) => {
  const dispatch = useAppDispatch();
  const currUser = useAppSelector((state) => state.userProfile.value);

  console.log(userOnline);

  const handleClick = async () => {
    dispatch(getRecipientId(userOnline.userId));
    const conversation = await axios.get('/conversations', {
      params: {
        participant1_id: currUser.id,
        participant2_id: userOnline.userId,
      }
    });
    console.log(conversation);
    dispatch(getConversationId(conversation.data.conversationId));
    dispatch(changeView('chat'));
  };

  return (
    <div onClick={handleClick} onKeyPress={() => { return; }} role='button' tabIndex={0}>
      {userOnline.name}
    </div>
  );
};

/**
 * onClick={()=>{ navigate(`/profile/${userPopup.id}`); }} 
                onKeyPress={()=>{ navigate(`/profile/${userPopup.id}`); }}
                role='button' 
                tabIndex={0}
 */

export default UserOnline;
