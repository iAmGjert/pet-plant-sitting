import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



const Event = (props: any) =>{
  const { name, location, user, eventObj, switchToDetailsView } = props;

  return (
    <Container>

      <Card style={{ width: '95%' }} className='bootstrap-card'>
        <Card.Header>Host: {user.name}</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
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


// CommunityEvents.propTypes = {};

export default Event;
