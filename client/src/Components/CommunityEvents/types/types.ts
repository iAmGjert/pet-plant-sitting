export interface EventTYPE {
  id: number;
  name: string;
  host: number | null;
  location: string;
  description: string;
  event_comments: Array<{ 
    id: number; 
    comment: string; 
    user: {
      id: number;
      name: string;
      image: string | null;
    }}> | null;
    event_participants: Array<{ 
    id: number; 
    user: {
      id: number;
      name: string;
      image: string | null;
    }}> | null;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    id: number;
    name: string;
    image: string | null;
  }
}
