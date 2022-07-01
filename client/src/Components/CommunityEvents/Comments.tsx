import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { deleteComment } from '../../state/features/events/eventsSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
// import ConfirmDelete from './ConfirmDelete';
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

const Comments = ({ comments }: any) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.userProfile.value);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentObj, setCommentObj] = useState(null);

  const handleDelete = (comment: Comment) => {
    console.log(comment);
    dispatch(deleteComment(comment)).unwrap();
  };

  const orderedComments = comments.slice().sort((a: Comment, b: Comment) => a.createdAt < b.createdAt ? -1 : 1);
  const numComments = comments.length;
  
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
        commentObject={commentObj} />
        
      { 
        numComments ? orderedComments.map((comment: Comment, index: number) => {
          return (
            <React.Fragment key={index}>
              <Card>
                <Container>
                  <Card.Header >
                    <Row>
                      <Col>
                        {comment.user?.name} 
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
                            onClick={() => handleDelete(comment)}>delete
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

