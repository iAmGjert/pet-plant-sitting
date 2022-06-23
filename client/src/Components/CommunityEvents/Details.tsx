import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { setView } from '../../state/features/events/eventsSlice';
import AddComment from './AddComment';

import { ArrowLeft } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Comments from './Comments';

import moment from 'moment';
import axios from 'axios';





const Details = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const view = useAppSelector(state => state.events.view);
  const eventObj = useAppSelector((state) => state.events.event);
  const {event_comments, event_participants, user} = eventObj;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const [comments, setComments] = useState(event_comments);
  const [showAddModal, setShowAddModal] = useState(false);

  console.log(showAddModal);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };
  
  const postComment = async (comment: any) => {
    return await axios.post('/api/events/comment/add', comment).then((res: any) => {
      console.log(res.data);
      return res.data;
    }).catch(err => { console.log(err); });

  };
  console.log(currentUser);
  const handleSubmit = () => {
    postComment({
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: commentInput
    });
    setComments([...comments, {
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: commentInput
    }]);
    setCommentInput('');
    dispatch(setView('details'));
  };
  
  const handleComments = () => {
    setShowComments(!showComments);
  };

  const numOfComments = comments.length;
  const numOfParticipants = event_participants.length;

  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':');
    return (+hour > 12) ? `${+hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
  };
   
  return (
    <Container>
      {
        showAddModal &&
      <AddComment 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        handleSubmit={handleSubmit}
      />
      }
      <Button variant="primary" onClick={() => dispatch(setView('list'))}>
        <ArrowLeft /> Back to Events
      </Button>
      <Card>
        <Card.Header as="h5">{eventObj.name}</Card.Header>
        <Card.Body>
          <Card.Title>Hosted by <a href={'/profile/' + user.id}>{user.name}</a></Card.Title>
          <Card.Text>
            {eventObj.description}
          </Card.Text>
          <div>
            <small><i>🧭 {eventObj.location}</i></small>
          </div>
          <div>
            <small><i>🗓️ {moment(eventObj.startDate).format('dddd, MMMM Do YYYY')}</i></small>
          </div>
          <div>
            <small><i>🕰️ {parseTime(eventObj.startTime)}</i></small>
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
        <Card.Footer>
          {
            currentUser.name.length ?
              <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
                      Add Comment
              </Button> 
              
              : <Button variant="primary" size="sm" href='/login'>
                    Login to add comment
              </Button>
          }
        </Card.Footer>
      </Card>
      <Button variant="primary" size='sm' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          back to top
      </Button>
    </Container>
  );
};

export default Details;
