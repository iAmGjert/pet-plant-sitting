import React, { ReactNode, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { setView, setEventObj, selectAllEvents, getEventsStatus, fetchEvents, pageView } from '../state/features/events/eventsSlice';
import Event from '../Components/CommunityEvents/Event';
import Details from '../Components/CommunityEvents/Details';
import CreateEvent from '../Components/CommunityEvents/CreateEvent';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../css/Events.css';
import { EventTYPE } from '../Components/CommunityEvents/types/types';
import EditEvent from '../Components/CommunityEvents/EditEvent';
import { ArrowLeft } from 'react-bootstrap-icons';
// import { PencilSquare } from 'react-bootstrap-icons';


const CommunityEventsMain = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(pageView);
  const events = useAppSelector(selectAllEvents);
  const eventsStatus = useAppSelector(getEventsStatus);

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
   
  type events = EventTYPE[];
  const renderView = (): ReactNode | null => {
    if (view === 'list') {
      const orderedEvents = events instanceof Array && events.slice()
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .filter((event) => new Date() <= new Date(`${event.startDate} ${event.startTime}`));

      return orderedEvents.map((event: EventTYPE, index: number) => (
        <React.Fragment key={`Event key: ${~~(Math.random() * 10000) * (event.id * index)}`} >
          <Event className='events-list' 
            name={event.name}
            host={event.host}
            location={event.location}
            description={event.description}
            comments={event.event_comments}
            startDate={event.startDate}
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
    } else if (view === 'edit-event') {
      return <EditEvent />;
    }
  };
  // console.log(view);
  
  const event = useAppSelector(state => state.events.event);

  return (
    <Container fluid>
      <div className="main-text">
        <h1>Community Events</h1>
      </div>
      { view === 'list' ? 
        <div className="events-create-btn">
          <Button className='bootstrap-button' onClick={() => changeView('create-event')} size='sm'>
          Create Event</Button>
        </div>
        : view === 'create-event' ? 
          <div className="events-create-btn">
            <Button className='bootstrap-button' onClick={() => changeView('list')} size='sm'>
              <ArrowLeft/>  Back
            </Button>
          </div> 
          : view === 'details' ? 
            <div className="events-create-btn">
              <Button className='bootstrap-button' variant="primary" size='sm'
                onClick={() => changeView('list')} >
                <ArrowLeft /> Back to Events
              </Button>
            </div> 
            : view === 'edit-event' ?
              <div className="events-create-btn">
                <Button className='bootstrap-button' variant="primary" size='sm'
                  onClick={() => changeView('details')} >
                  <ArrowLeft /> Back to {event.name}
                </Button>
               
              </div>
              : null

      }



      <div className='container'>{renderView()}</div>
    </Container>
  );
};


export default CommunityEventsMain;
