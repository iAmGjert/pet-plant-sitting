import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const Job = ({ job }) => {
  const {id, location, pet_plant, employer_id, sitter_id, startDate, endDate} = job;
  const handleClick = ()=>{
    console.log(`Clicked more info for job#${id}`);
  }
  return (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col xs sm={1} md={1} lg={1}>
              <Card.Title>
                Job#{id}
              </Card.Title>
            </Col>
            <Col>        
              <Card.Text>
                Employer: {employer_id}, Job Description: {pet_plant}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
            Job Location: {location}
            </Col>
          </Row>
          <Button onClick={()=>{ handleClick(); }} variant='primary'>More Info</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

Job.propTypes = {};

export default Job;
