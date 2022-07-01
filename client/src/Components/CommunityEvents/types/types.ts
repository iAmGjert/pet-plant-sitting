export interface EventTYPE {
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
