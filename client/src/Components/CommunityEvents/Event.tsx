import React from 'react';
// import PropTypes from 'prop-types';

interface Comment {
  id: number;
  comment: string;
  user: {
    name: string;
    image: string;
  }
}

const Event = (props: any) =>{
  // console.log(props);
  // eslint-disable-next-line react/prop-types
  const { name, location, description, comments, participants, startDate, startTime, user } = props;
  // const { name, image } = props.user;
  console.log(props, comments);
  return (
    
    <div style={{border: '1px solid red'}}>
      <h3>Event Name: {name}</h3>
      <h4>Host: {user.name}</h4>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      <span>Date: {startDate} </span>
      <span>Time: {startTime} </span>
      <p>Comments: {comments.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.user.name}</p>
            <p>{comment.comment}</p>
          </div>
        );
      })}</p> 
      <p>People interested: {participants.length}</p> 
            
    </div>
  );
};

// CommunityEvents.propTypes = {};

export default Event;
