import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { setView, setEvents, setEventObj, 
  selectAllEvents,
  getEventsStatus,
  fetchEvents
} from '../state/features/events/eventsSlice';
import Event from '../Components/CommunityEvents/Event';
import Details from '../Components/CommunityEvents/Details';
import CreateEvent from '../Components/CommunityEvents/CreateEvent';
import '../Components/CommunityEvents/style/EventsMain.css';

interface EventTYPE {
  // map(arg0: (event: EventTYPE) => JSX.Element): any;
  id: number;
  name: string;
  host: number;
  location: string;
  description: string;
  event_comments: Array<{ 
    id: number; 
    comment: string; 
    user: {
      id: number;
      name: string;
      image: string;
    }}>;
    event_participants: Array<{ 
    id: number; 
    user: {
      id: number;
      name: string;
      image: string;
    }}>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    id: number;
    name: string;
    image: string;
  }
}

const CommunityEventsMain = () => {
  const dispatch: any = useAppDispatch();
  const state = useAppSelector((state) => state);
  const view = useAppSelector(state => state.events.view);
  // const events = useAppSelector(state => state.events.events);
  const events = useAppSelector(selectAllEvents);
  const eventsStatus = useAppSelector(getEventsStatus);

  useEffect(() => {
    if (eventsStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventsStatus, dispatch]);
  
  
  
  
  
  
  
  
  
  
  
  console.log(events);
  
  // useEffect(() => {
  //   const getEvents = async () => {
  //     const res = await axios.get('/api/events/all');
  //     return dispatch(setEvents(res.data));
  //   };
  //   getEvents();
  // }, [dispatch]);
  
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
    <Container fluid>
      <div className="main-text">
        <h1>Community Events</h1>
      </div>
      <div className="events-create-btn">
        <Button onClick={switchToCreateView} size='sm'>Create Event</Button>
      </div>
      <div className='container'>{renderView()}</div>
    </Container>
  );
};


export default CommunityEventsMain;
