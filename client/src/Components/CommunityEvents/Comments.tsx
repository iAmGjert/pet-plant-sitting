/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useAppSelector } from '../../state/hooks';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import ConfirmDelete from './ConfirmDelete';
import EditComment from './EditComment';
import '../../css/Events.css';
import { useNavigate } from 'react-router-dom';


interface Comment {
  id: number;
  event_id: number;
  comment: string;
  user: {
    id: number;
    name: string;
    image: string;
  }
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

const Comments = ({ comments }: any) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.userProfile.value);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentObj, setCommentObj] = useState(null);

  const orderedComments = comments.slice().sort((a: Comment, b: Comment) => a.createdAt < b.createdAt ? -1 : 1).reverse();
  const numComments = comments.length;
  
  return (
    <>
      <ConfirmDelete  
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        commentObject={commentObj} />

      <EditComment
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        commentObject={commentObj} />
        
      { 
        numComments ? orderedComments.map((comment: Comment, index: number) => {
          return (
            <div className='comment-block' key={`Comment key: ${~~(Math.random() * 10000) * (index * comment.id)}`}>
              <div className='img-comment-container'>
                <div className='comment-img x666'>
                  <img src={comment.user.image} alt={comment.user.name} />
                </div>
                <div className="comment-container x666 bootstrap-textbox">
                  
                  <div className='comment-name' 
                    role='button' 
                    onClick={()=>{ navigate(`/profile/${comment.user.id}`); }}>
                    <b>{comment.user?.name}</b></div>
                  <div className='comment-body'>{comment.comment}</div>
                </div>
              </div>
              <span className='comment-footer'>
                <small className='comment-time'>{moment(comment.createdAt).fromNow()}</small>
                <small>
                
                  {
                    currentUser.id === comment.user_id ?
                      <span className='modify-comment'><Button className='button-as-link' variant='link' 
                        // style={{ color: 'black' }}
                        onClick={() => {
                          setCommentObj(comment);
                          setShowEditModal(true);
                        }}>edit</Button>&nbsp;|&nbsp;
                      <Button className='button-as-link' variant='link' 
                        // style={{ color: 'black' }}
                        onClick={() => { 
                          setCommentObj(comment);
                          setShowDeleteModal(true);
                        }
                        }> delete
                      </Button></span> : <></>
                  }
                </small>
              </span>
            </div>
          );
        }) : <></>
      }
    </>
  );
};

export default Comments;
