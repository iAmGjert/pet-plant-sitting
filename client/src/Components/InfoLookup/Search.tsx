import React, {useState} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';

const Search = () => {
  
  const handleClick = ()=>{
    console.log(searchTarget);
  };
  const [searchTarget, setSearchTarget] = useState('');
  const onChange = (e:any) => {
    setSearchTarget(e.target.value);
  };

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='formSearch'>
              <Form.Control type='search' placeholder='Fern, Dog, Cat, Octopus, etc...' onChange={ (e)=>{ onChange(e); }}/>
              <Form.Text className='text-muted'>
          Search for Plants/Animals by name/species or upload a photo and get some information about that subject!
              </Form.Text>
            </Form.Group>
          </Col>
            
        </Row>
        <Row>
          <Col xs lg={2} className='infoUploadPhotoButton'>
            <Button size='lg' onClick={ ()=>{ handleClick(); } } type='button'>Submit</Button>
          </Col>
          <Col xs lg={2}>
            <Button onClick={ ()=>{ handleClick(); } } type='button'><img alt='' src='https://www.svgrepo.com/show/281155/cloud-computing-upload.svg' style={{height: 35}} /></Button>
          </Col>
        </Row>
      </Form>
      <Card>
        <Card.Body>
          <Row>
            <Col xs sm={1} md={1} lg={1}>
              <Card.Title>
                Column 1 Row 1
              </Card.Title>
            </Col>
              
            <Col>
              <Card.Title>
                Column 2 Row 1
              </Card.Title>
            </Col>
            <Col>        
              <Card.Title>
                Column 3 Row 1
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Title>
                Column 1 Row 2
              </Card.Title>
            </Col>
          </Row>
          <Button onClick={handleClick} variant='primary'>More Info</Button>
          <>
          </>
        </Card.Body>
      </Card>
    </Container>  
  );
};

Search.propTypes = {};

export default Search;
