import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Comments from './Comments';
import moment from 'moment';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Details = /*React.forwardRef(ref)*/ () => {
  const dispatch = useAppDispatch();
  const eventObj = useAppSelector((state) => state.events.event);
  const {event_comments, event_participants, user} = eventObj;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const currentUser = useAppSelector(state => state.userProfile.value);
  console.log(currentUser);
  // const commentRef = useRef<null | HTMLDivElement>(null);
  // const pageTopRef = useRef<null | HTMLButtonElement>(null);

  // const showComments = true;
  // useEffect(() => {
  //   commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [showComments]);
  
  // const handleScroll = () => {
  //   setShowComments(true);
  // };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const postComment = async (comment: any) => {
    const newComment = await axios.post('/api/events/comment/add', comment);
    return newComment;
  };
  const handleSubmit = async () => {
    console.log('handleSubmit');
    const newComment = {
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: comment
    };
    const res = await postComment(newComment);
    console.log(res);
    setComment('');
    // handleComments();
  };

  const handleComments = () => {
    setShowComments(true);
  };
  // console.dir(eventObj);
  const numOfComments = event_comments.length;
  const numOfParticipants = event_participants.length;
  return (
    <>
      <Card>
        <Card.Header as="h5">{eventObj.name}</Card.Header>
        <Card.Body>
          <Card.Title>Hosted by {user.name}</Card.Title>
          <Card.Text>
            {eventObj.description}
          </Card.Text>
          <div>
            <small><i>🧭 {eventObj.location}</i></small>
          </div>
          <div>
            <small><i>🗓️ {eventObj.startDate}</i></small>
          </div>
          <div>
            <small><i>🕰️ {eventObj.startTime}</i></small>
          </div>
        </Card.Body>
        <Card.Footer>
          <Container fluid="sm">
            <Row>
              <Col>{numOfParticipants === 1 ? 
                <small>{numOfParticipants} person interested</small>
                : numOfParticipants > 1 ?
                  <small>{numOfParticipants} people interested</small>
                  : <small>0 people interested</small>}
              </Col>
              <Col>
                <Button variant="link" onClick={handleComments}>
                  {
                    numOfComments === 1 ?
                      <small>{numOfComments} comment</small>
                      : numOfComments >= 1 ?
                        <small>{numOfComments} comments</small>
                        : <small>No comments</small>
                  }
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
      { showComments ? <Comments /*ref={commentRef}*//> : <></> }
      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Add Comment Here</Form.Label>
              <Form.Control as="textarea" rows={2} 
                onChange={handleCommentChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" size="sm"onClick={handleSubmit}>
        Add Comment</Button> 
        </Card.Footer>
      </Card>
    </>
  );
};

export default Details;
