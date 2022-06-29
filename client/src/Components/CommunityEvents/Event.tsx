import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useAppSelector } from '../../state/hooks';



const Event = (props: any) =>{
  const { name, location, user, eventObj, switchToDetailsView } = props;
  const currentUser = useAppSelector(state => state.userProfile.value);
  // console.log(user);

  return (
    <Container>

      <Card style={{ width: '95%' }} className='bootstrap-card'>
        <Card.Header>
          <Row>
            <Col>
            Host: {user?.name}
            </Col>
            {currentUser?.id === user?.id && (  
              <Col>
                <Button variant='link'>
                  edit 
                </Button>
                  |
                <Button variant='link'>
                  delete
                </Button>
              </Col>
            )}
          </Row>
        </Card.Header>
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
