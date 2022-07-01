import React, { ReactNode, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { setView, setEventObj, selectAllEvents, getEventsStatus, fetchEvents, 
  pageView } from '../state/features/events/eventsSlice';
import Event from '../Components/CommunityEvents/Event';
import Details from '../Components/CommunityEvents/Details';
import CreateEvent from '../Components/CommunityEvents/CreateEvent';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../Components/CommunityEvents/style/EventsMain.css';
import { EventTYPE } from '../Components/CommunityEvents/types/types';


const CommunityEventsMain = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(pageView);

  const events = useAppSelector(selectAllEvents);
  const eventsStatus = useAppSelector(getEventsStatus);
  
  console.log(events instanceof Array && events
    .map((e: EventTYPE) => e.event_comments)
    .filter((c: any) => c.length));

  useEffect(() => {
    if (eventsStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventsStatus, dispatch]);
  
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
  
  type events = EventTYPE[];
  const renderView = (): ReactNode | null => {
    if (view === 'list') {
      const orderedEvents = events instanceof Array && events.slice()
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .filter((event) => new Date() <= new Date(`${event.startDate} ${event.startTime}`));

      return orderedEvents.map((event: EventTYPE) => (
        <React.Fragment key={event.id} >
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
        </React.Fragment>
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
