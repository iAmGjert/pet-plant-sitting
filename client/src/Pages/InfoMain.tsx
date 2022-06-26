import React, {useState, useEffect } from 'react';
import Search from '../Components/InfoLookup/Search';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

export default function InfoMain() {
  return (
    <Container fluid>
      <Search />
    </Container>
  );
}
