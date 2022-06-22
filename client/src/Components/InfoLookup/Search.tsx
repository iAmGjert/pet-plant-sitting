import React, {useState} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { search, saveSearch } from '../../state/features/info/infoSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

const Search = () => {
  
  const dispatch = useAppDispatch();
  const handleClick = ()=>{
    console.log(searchTarget);
    setSearchTarget('');
  };
  const [searchTarget, setSearchTarget] = useState('');
  return (
    <Container className = 'testContainer'>
      <Form>
        <Row className='testRow'>
          <Form.Group controlId='formSearch'>
            <Form.Control type='search' placeholder='Octopus, Fern, Dog, etc...' onChange={ (e)=>{ setSearchTarget(e.target.value); }} value={searchTarget}/>
            <Form.Text className='text-muted'>
          Search by species or **COMING SOON** upload a photo to search!
            </Form.Text>
          </Form.Group>
            
        </Row>
        <Row className='testRow'>
          <Col className='testCol'>
            <Button size='lg' onClick={ ()=>{ handleClick(); } } type='button'>Search</Button>
          </Col>
          <Col className='testCol'>
            <Button disabled onClick={ ()=>{ handleClick(); } } type='button'><img alt='' src='https://www.svgrepo.com/show/281155/cloud-computing-upload.svg' style={{height: 35}} /></Button>
          </Col>
        </Row>
      </Form>
    </Container>  
  );
};

Search.propTypes = {};

export default Search;
