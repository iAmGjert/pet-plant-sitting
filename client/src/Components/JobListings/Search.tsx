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
    <div>
      <div> </div>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId='formSearch'>
                <Form.Control type='search' placeholder='Search Jobs...' onChange={ (e)=>{ onChange(e); }}/>
                <Form.Text className='text-muted'>
          Filter your job search by keywords!
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs lg={2}>
              <Button onClick={ ()=>{ handleClick(); } } type='button'>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>  
    </div>
  );
};

Search.propTypes = {};

export default Search;
