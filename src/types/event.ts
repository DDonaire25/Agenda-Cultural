export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  category: 'música' | 'arte' | 'teatro' | 'danza' | 'literatura' | 'otro';
  attendees: string[];
}