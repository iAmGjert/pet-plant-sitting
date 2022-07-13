import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
// import { deleteComment } from '../../state/features/events/eventsSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import ConfirmDelete from './ConfirmDelete';
import EditComment from './EditComment';
import './style/EventsMain.css';

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
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.userProfile.value);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentObj, setCommentObj] = useState(null);

  // const handleDelete = (comment: Comment) => {
  //   if (window.confirm(
  //     `Are you sure you want to delete this comment?
  //     This action cannot be undone.`
  //   )) {
  //     dispatch(deleteComment(comment)).unwrap();
  //   }
  // };

  // console.log(commentObj);
  const orderedComments = comments.slice().sort((a: Comment, b: Comment) => a.createdAt < b.createdAt ? -1 : 1);
  const numComments = comments.length;
  
  return (
    <>
      <ConfirmDelete  
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        // deleteComment={deleteComment}
        commentObject={commentObj} />
      <EditComment
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        commentObject={commentObj} />
        
      { 
        numComments ? orderedComments.map((comment: Comment, index: number) => {
          return (
            <div className='comment-block' key={`Comment key: ${~~(Math.random() * 10000) * (index * comment.id)}`}>
              <div className='comment-img'>
                <img src={comment.user.image} alt={comment.user.name} />
              </div>
              <div className="comment-container">

                <div className='comment-name'><b>{comment.user?.name}</b></div>
                <div className='comment-body'>{comment.comment}</div>
              </div>
              <span className='comment-footer'>
                <small className='comment-time'>{moment(comment.createdAt).fromNow()}</small>
                <small>
                  {
                    currentUser.id === comment.user_id ?
                      <span className='modify-comment'><Button className='button-as-link' variant='link'
                        onClick={() => {
                          setCommentObj(comment);
                          setShowEditModal(true);
                        }}>edit</Button> &nbsp;|&nbsp;
                      <Button className='button-as-link' variant='link' 
                        onClick={() => {/*handleDelete(comment)*/ 
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



// <Card className='bootstrap-button'>
// <Container fluid>
//   <Card.Header >
//     <Row>
//       <Col>
//         {comment.user?.name} 
//       </Col>
//       {currentUser.id === comment.user_id ? 
//         <Col>
//           <Button className='button-as-link' variant='link'
//             onClick={() => {
//               setCommentObj(comment);
//               setShowEditModal(true);
//             }}>
//             edit 
//           </Button>
//           &nbsp;|&nbsp;
//           <Button className='button-as-link' variant='link' 
//             onClick={() => handleDelete(comment)}> delete
//           </Button> 
//         </Col> : null}
//     </Row>
//   </Card.Header>
// </Container>
// <Card.Body>
//   {comment.comment}
// </Card.Body>
// <Card.Footer>
//   <small>{moment(comment.createdAt).fromNow()}</small>
// </Card.Footer>
// </Card>
