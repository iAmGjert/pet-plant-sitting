import React from 'react';
import Search from '../Components/InfoLookup/Search';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

export default function InfoMain() {

  const handleClick = (error)=>{
    console.log(e.target.value);
  };
  return (
    <Container fluid>
      <h1>Info Lookup!</h1>
      <Search />
    </Container>
  );
}
