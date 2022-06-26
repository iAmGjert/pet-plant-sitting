import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



const Event = (props: any) =>{
  const { name, location, user, eventObj, switchToDetailsView } = props;

  return (
    <Container>
      <Card border="primary" style={{ width: '95%' }}>
        <Card.Header>Hosted by {user?.name}</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <b>Location: </b> {location}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="btn btn-sm ml-auto" 
            variant="link"
            onClick={() => switchToDetailsView(eventObj)}>More Info</Button>
        </Card.Footer>
      </Card>
    </Container> 
  );
};


// CommunityEvents.propTypes = {};

export default Event;
