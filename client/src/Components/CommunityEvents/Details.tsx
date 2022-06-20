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
import Form from 'react-bootstrap/Form';
import { setView } from '../../state/features/events/eventsSlice';


const Details = /*React.forwardRef(ref)*/ () => {
  const dispatch = useAppDispatch();
  const eventObj = useAppSelector((state) => state.events.event);
  const {event_comments, event_participants, user} = eventObj;
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const currentUser = useAppSelector(state => state.userProfile.value);
  const view = useAppSelector(state => state.events.view);

  // const [commentsListLength, setCommentsListLength] = useState(event_comments.length);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
    // setCommentsList([...commentsList, {
    //   user: currentUser.id,
    //   comment: commentInput,
    //   createdAt: new Date().toISOString(),
    // }]);
  };
  



  const postComment = async (comment: any) => {
    return await axios.post('/api/events/comment/add', comment).then((res: any) => {
     
      console.log(event_comments.length);
      return res;
    }).catch(err => { console.log(err); });
    // return newComment;
  };
  
  const handleSubmit = () => {
    postComment({
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: commentInput
    });
    // handleComments();
    // console.log(res);
    console.log(commentInput);
    setCommentInput('');
    console.log(commentInput);
    dispatch(setView('details'));
  };
  
  console.log(event_comments.length);

  const handleComments = () => {
    setShowComments(!showComments);
  };
  // console.log(showComments);
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
            <small><i>🕰️ {eventObj.startTime.slice(0, -3)} PM</i></small>
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
                 
                  {/* <small>{commentsList.length} comments</small> */}
                      
                        

                  
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


// console.log(c
// const commentRef = useRef<null | HTMLDivElement>(null);
// const pageTopRef = useRef<null | HTMLButtonElement>(null);

// const showComments = true;
// useEffect(() => {
//   commentRef.current?.scrollIntoView({ behavior: 'smooth' });
// }, [showComments]);

// const handleScroll = () => {
//   setShowComments(true);
// };
