import React, { useEffect, useState } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../state/hooks';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [completeProfile, setCompleteProfile] = useState(0);
  const { id } = useParams();
  // get a user based on the id in the url
  const currUser = useAppSelector((state) => state.userProfile.value);
  useEffect(() => {
    if (currUser.id && Number(id) == currUser?.id) {
      setEditable(true);
    }
  }, [currUser, id]);
  console.log(currUser);
  return (
    <Container>
      <Row className='d-flex justify-content-center text-center' xs={1} md={1}>
        <Col>
          <Image
            roundedCircle
            fluid
            thumbnail
            src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F09%2F04%2FBeyonce-1.jpg'
          />
        </Col>
        <Col>
          <span>
            <h1 style={{ fontSize: '40px' }}>{currUser.name}</h1>
            {editable && <button>Edit</button>}
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
