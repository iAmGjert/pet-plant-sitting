import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { setEventObj } from '../../state/features/events/eventsSlice';

import ConfirmDelete from './ConfirmDelete';
import EditComment from './EditComment';

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

const Comments = (props: any) => {
  const dispatch = useAppDispatch();
  // const comments = useAppSelector((state) => state.events.event.event_comments);
  const currentUser = useAppSelector((state) => state.userProfile.value);
  const eventObj = useAppSelector((state) => state.events.event);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  console.log(props);

  const [commentsArray, setCommentsArray] = useState(props.comments);

  const deleteComment = (commentId: number) => {
    axios.delete(`/api/events/comment/delete/${commentId}`)
      .then(() => {
        props.getComments();
      }).catch(err => {
        console.log(err);
      });
    // dispatch(setEventObj({ ...eventObj, event_comments: res.data }));
    
  };

  const editComment = (commentId: number, commentMessage: string) => {
    axios.patch(`/api/events/comment/update/${commentId}`, { comment: commentMessage })
      .then(() => {
        props.getComments();
        setShowEditModal(false);
      }).catch(err => console.error(err));
   
  };

  const [commentObj, setCommentObj] = useState(null);

  // console.log(commentObj, 'comment obj');
  console.log(currentUser);
  console.log(props.comments);
  console.log(eventObj);
  const numComments = props.comments.length;
  return (
    <>
      {/* <ConfirmDelete  
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteComment={deleteComment}
        commentObject={commentObj} /> */}
      <EditComment
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editComment={editComment}
        commentObject={commentObj} />
        
      { 
        numComments ? props.comments.map((comment: Comment, index: number) => {
          return (
            <React.Fragment key={index}>
              <Card>
                <Container>
                  <Card.Header >
                    <Row>
                      <Col>
                        {comment.user.name} 
                      </Col>
                      {currentUser.id === comment.user_id ? 
                        <Col>
                          <Button variant='link'
                            onClick={() => {
                              setCommentObj(comment);
                              setShowEditModal(true);
                            }}>
                            edit
                          </Button>
                            | 
                          <Button variant='link' 
                            onClick={() => {
                              deleteComment(comment.id);
                              // setCommentObj(comment);
                              // setShowDeleteModal(true);
                            }}>delete
                          </Button> 
                        </Col> : null}
                    </Row>
                  </Card.Header>
                </Container>
                <Card.Body>
                  {comment.comment}
                </Card.Body>
                <Card.Footer>
                  <small>{moment(comment.createdAt).fromNow()}</small>
                </Card.Footer>
              </Card>
            </React.Fragment>
          );
        }) : <></>
      }
    </>
  );
};

export default Comments;

