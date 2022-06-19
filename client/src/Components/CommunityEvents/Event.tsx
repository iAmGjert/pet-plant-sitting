import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



const Event = (props: any) =>{
  const { name, location, user, eventObj, switchToDetailsView } = props;
  return (
    <Container>

      <Card border="primary" style={{ width: '95%' }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Title>Host: {user.name}</Card.Title>
          <Card.Text>
            <b>Location: </b> {location}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="btn btn-sm ml-auto" 
            variant="link"
            onClick={() => switchToDetailsView(eventObj)}>Interact</Button>
        </Card.Footer>
      </Card>
    </Container>

          

    
  );
};






// <h3>Event Name: {name}</h3>
// <h4>Host: </h4>
// <p>Location: {location}</p>
{ /* <p>Description: {description}</p> */ }
{ /* <span>Date: {startDate} </span> */ }
{ /* <span>Time: {startTime} </span> */ }
{ /* <div>Comments: {comments.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.user.name}</p>
            <p>{comment.comment}</p>
          </div>
        );
      })}</div>  */ }
// <p>People interested: {participants.length}</p> 
{ /* <button onClick={() => switchToDetailsView()}>Details</button> */ }


// CommunityEvents.propTypes = {};

export default Event;
