import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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

const Comments = (props: any) => {
  const dispatch = useAppDispatch();
  // const comments = useAppSelector((state) => state.events.event.event_comments);
  console.log(props.comments);
 
  // console.log(comments);
  const numComments = props.comments.length;
  return (
    <>
      { 
        numComments ? props.comments.map((comment: Comment, index: number) => {
          return (
            <React.Fragment key={index}>
              <Card>
                <Container>
                  <Row>
                    <Col>
                      <Card.Header >
                        {/* <img src={comment.user.image} alt="user" className="rounded-circle" />   */}
                        {/* <Button variant="link" href={'/profile/' + comment.user.user_id} > */}
                        {comment.user?.name}
                        {/* </Button> */}
                        
                      </Card.Header>
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
          );
        }) : <></>
      }
    </>
  );
};

export default Comments;

