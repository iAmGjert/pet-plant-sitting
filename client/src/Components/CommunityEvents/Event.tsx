import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Event = (props: any) =>{
  const { name, location, user, eventObj, switchToDetailsView } = props;

  return (
    <Container>
      <Card style={{ width: '95%' }} className='bootstrap-card'>
        <Card.Header>
          <Row>
            <Col>
            Host: {user?.name}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <b>Location: </b> {location}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="button-as-link" 
            variant="link"
            onClick={() => switchToDetailsView(eventObj)}>More Info</Button>
        </Card.Footer>
      </Card>
    </Container> 
  );
};

export default Event;
