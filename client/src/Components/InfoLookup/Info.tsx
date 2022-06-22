import React, {useState} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
// import PropTypes from 'prop-types';

const Info = () => {
  const result = useAppSelector(state=>state.info.searchResult);
  const handleClick = (e)=>{
    console.log(e.target.value);
  };

  return (
    <Container className = 'testContainer'>
      <Card>
        <Card.Title>Most Recent Search: {result.query}</Card.Title>
        <Card.Body>
          <Row className='testRow'>
            <Col className='testCol' xs sm={1} md={1} lg={1}>
              <Card.Title>
                {result.query}
              </Card.Title>
            </Col>
            <Col className='testCol'>        
              <Card.Title>
                {result.response}
              </Card.Title>
            </Col>
          </Row>
          <Row className='testRow'>
            <Col className='testCol'>
              <Card.Title>
                {result.response}
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>  
  );
};

Info.propTypes = {};

export default Info;
