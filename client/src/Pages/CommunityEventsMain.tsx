import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Button from 'react-bootstrap/Button';
import { /*getEvents, getView,*/ setView, setEvents, setEventObj } from '../state/features/events/eventsSlice';
import Event from '../Components/CommunityEvents/Event';
import Details from '../Components/CommunityEvents/Details';
import CreateEvent from '../Components/CommunityEvents/CreateEvent';
import '../Components/CommunityEvents/style/EventsMain.css';

interface EventTYPE {
  id: number;
  name: string;
  host: number;
  location: string;
  description: string;
  event_comments: Array<{ 
    id: number; 
    comment: string; 
    user: {
      name: string;
      image: string;
    }}>;
    event_participants: Array<{ 
    id: number; 
    user: {
      name: string;
      image: string;
    }}>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}

const CommunityEventsMain = () => {
  const dispatch: any = useAppDispatch();
  const state = useAppSelector((state) => state);
  const view = useAppSelector(state => state.events.view);
  const events = useAppSelector(state => state.events.events);

  console.log(events); // with user and comment data included 
  
  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get('/api/events/all');
      return dispatch(setEvents(res.data));
    };
    getEvents();
  }, [dispatch]);
  
  const changeView = (option: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(setView(option));
  };
  const switchToDetailsView = (eventObj: EventTYPE) => {
    changeView('details');
    dispatch(setEventObj(eventObj));
  };
  const switchToCreateView = () => {
    changeView('create-event');
    dispatch(setView('create-event'));
  };
  
  
  const renderView = (): any => {
    if (view === 'list') {
      return events.map((event: EventTYPE) => (
        <div key={event.id} /*style={{border: '1px solid red'}}*/>
          <Event className='events-list'
            name={event.name}
            host={event.host}
            location={event.location}
            description={event.description}
            comments={event.event_comments}
            participants={event.event_participants}
            startDate={event.startDate}
            endDate={event.endDate}
            startTime={event.startTime}
            user={event.user}
            switchToDetailsView={switchToDetailsView}
            eventObj={event}
          />
        </div>
      ));
    } else if (view === 'details') {
      return <Details />;
    } else if (view === 'create-event') {
      return <CreateEvent />;
    }
  };
  
  return (
    <div>
      <div className="main-text">
        <h1>Community Events</h1>
      </div>
      <div className="events-create-btn">
        <Button onClick={switchToCreateView} size='sm'>Create Event</Button>
      </div>
      <div className='container'>{renderView()}</div>
    </div>
  );
};


export default CommunityEventsMain;
