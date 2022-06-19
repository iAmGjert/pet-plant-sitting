import React from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
interface Comment {
  id: number;
  event_id: number;
  comment: string;
  user: {
    name: string;
    image: string;
  }
  createdAt: string;
  updatedAt: string;
}


const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.events.event.event_comments);
  
  console.log(comments);
  const numComments = comments.length;
  return (
    <>
      {
        numComments ? comments.map((comment: Comment, index: number) => {
          return (
            <React.Fragment key={index}>
              <Card>
                <Container>
                  <Row>
                    <Col>
                      <Card.Header ><b>{comment.user.name}</b></Card.Header>
                    </Col>
                  </Row>
                </Container>
                <Card.Body>
                  {comment.comment}
                </Card.Body>
                <Card.Footer>
                  <small>{moment(comment.createdAt).fromNow()}</small>
                </Card.Footer>
              </Card>
            </React.Fragment>

          // <div key={index}>
          //   <p>{comment.user.name}</p>
          //   <p>{comment.comment}</p>
          // </div>
          );
        }) : <></>
      }
    </>
  );
};

export default Comments;

