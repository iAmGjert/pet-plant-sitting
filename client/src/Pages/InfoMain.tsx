import React, {useState, useEffect } from 'react';
import Search from '../Components/InfoLookup/Search';
import Info from '../Components/InfoLookup/Info';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

export default function InfoMain() {
  const [info, setInfo] = useState();
  const handleClick = (error)=>{
    console.log(e.target.value);
  };
  return (
    <Container className = 'testDiv' fluid>
      <Search />
      <Info />
    </Container>
  );
}
