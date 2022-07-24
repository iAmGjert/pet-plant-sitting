import React from 'react';
import { Card } from 'react-bootstrap';
import { RatingInfo } from '../../Pages/Profile';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar';

type Props = {
  rating: RatingInfo;
  getStars: (num: number) => [number];
};

const Rating = ({ rating, getStars }: Props) => {
  const navigate = useNavigate();
  const navigateToUser = (id: number) => {
    navigate(`/profile/${id}`);
  };
  // console.log(rating, 'rating');
  return (
    <Card className='bootstrap-card'>
      <Card.Body>
        <Card.Title
          onClick={() => {
            navigateToUser(rating.submitter_id);
          }}
        >
          <img
            src={rating.submitter.image}
            alt=''
            className='reviewAvatar'
          ></img>
          {rating.submitter.name}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {getStars(rating.value).map((e) => {
            if (e === 1) {
              return <AiFillStar color='gold' />;
            } else {
              return <AiOutlineStar />;
            }
          })}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>
          {moment(rating.createdAt).format('MMMM Do, YYYY')}
        </Card.Subtitle>
        <Card.Text>{rating.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Rating;
