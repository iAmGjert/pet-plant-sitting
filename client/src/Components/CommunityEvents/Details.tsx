import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { setView, addComment } from '../../state/features/events/eventsSlice';
import AddComment from './AddComment';
import { ArrowLeft } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Comments from './Comments';
import moment from 'moment';

const Details = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const event = useAppSelector(state => state.events.event);
  const { event_comments, user } = event;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentInput(e.target.value);

  const handleComments = () => setShowComments(!showComments);

  const canSubmit = !!commentInput && addRequestStatus === 'idle';
  const handleSubmit = () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending');
        dispatch(addComment({
          event_id: event.id, 
          comment: commentInput, 
          user_id: currentUser.id,
          user: {
            id: currentUser.id,
            name: currentUser.name,
            image: currentUser.image
          }
        })).unwrap();
      } catch (error) {
        setAddRequestStatus('error');
        console.error('Failed to save comment', error);
      } finally {
        setAddRequestStatus('idle');
        setCommentInput('');
      }
    }    
  };

  const numOfComments = event_comments.length;

  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':');
    return (+hour > 12) ? `${+hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
  };
   
  return (
    <Container fluid>
      {
        <AddComment 
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          handleSubmit={handleSubmit}
          handleCommentChange={handleCommentChange} 
          canSubmit={canSubmit} />
      }
      <Button className='bootstrap-button' variant="primary" onClick={() => dispatch(setView('list'))}>
        <ArrowLeft /> Back to Events
      </Button>
      <Card className='bootstrap-card'>
        <Card.Header as="h5">
          <Row>
            <Col>
              {event.name}
            </Col>
            {currentUser?.id === event.user?.id && (
              <Col>
                <Link to={`/events/edit/${event.id}`}>
                  modify
                </Link>
              </Col>
            )}
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title >Hosted by&nbsp;
            <Button className='button-as-link' variant="link" size='lg' onClick={() => navigate(`/profile/${user.id}`)}>{user.name}
            </Button>
          </Card.Title>
          <Card.Text>
            {event.description}
          </Card.Text>
          <div>
            <small><i>🧭 {event.location}</i></small>
          </div>
          <div>
            <small><i>🗓️ {moment(event.startDate).format('dddd, MMMM Do YYYY')}</i></small>
          </div>
          <div>
            <small><i>🕰️ {parseTime(event.startTime)}</i></small>
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
              <Col className='bootstrap-card'>
                <Button className='button-as-link' variant="link" onClick={handleComments}>
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
      { showComments && <Comments comments={event_comments} /> }
      <Card className='bootstrap-card'>
        <Card.Footer>
          {
            currentUser.name.length ?
              <Button className='bootstrap-button' variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
                      Add Comment
              </Button> 
              
              : <Button className='bootstrap-button' variant="primary" size="sm" href='/login'>
                    Login to add comment
              </Button>
          }
        </Card.Footer>
      </Card>
      <Button className='bootstrap-button' variant="primary" size='sm' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          back to top
      </Button>
    </Container>
  );
};

export default Details;
