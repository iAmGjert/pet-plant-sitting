import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';
import { setView, setEventObj } from '../../state/features/events/eventsSlice';
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
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const events = useAppSelector(state => state.events.events);
  const eventObj = useAppSelector((state) => state.events.event);

  const {event_comments, event_participants, user} = eventObj;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  

  const [comments, setComments] = useState(event_comments);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const getComments = () => {
    axios.get('/api/events/comments/all').then(res => {
      setComments(res.data);
    }).catch(err => console.error(err));
  };

  const postComment = (comment: any) => {
    axios.post('/api/events/comment/add', comment).then(() => {
      getComments();
    }).then(()=> {
      setCommentInput('');
    }).catch(err => console.error(err));
  };


  const handleSubmit = () => {
    postComment({
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: commentInput,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.image
      }
    });
    setComments([...comments, {
      event_id: eventObj.id,
      user_id: currentUser.id,
      comment: commentInput,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.image
      }
    }]);
  };
  
  const handleComments = () => {
    setShowComments(!showComments);
  };

  const numOfComments = comments.length;
  // const numOfParticipants = event_participants.length;

  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':');
    return (+hour > 12) ? `${+hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
  };
   
  return (
    <Container>
      {
        // showAddModal &&
        <AddComment 
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          handleSubmit={handleSubmit}
          handleCommentChange={handleCommentChange}
        />
      }
      <Button variant="primary" onClick={() => dispatch(setView('list'))}>
        <ArrowLeft /> Back to Events
      </Button>
      <Card>
        <Card.Header as="h5">{eventObj.name}</Card.Header>
        <Card.Body>
          <Card.Title >Hosted by
            <Button variant="link" size='lg' onClick={() => navigate(`/profile/${user.id}`)}>{user.name}
            </Button>
          </Card.Title>
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
              {/* <Col>{numOfParticipants === 1 ? 
                <small>{numOfParticipants} person interested</small>
                : numOfParticipants > 1 ?
                  <small>{numOfParticipants} people interested</small>
                  : <small>0 people interested</small>}
              </Col> */}
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
      { showComments ? <Comments 
        comments={comments} 
        getComments={getComments} /> : <></> }
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
