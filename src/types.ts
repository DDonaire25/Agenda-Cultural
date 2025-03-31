export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  responsible: string;
  phone: string;
  instagram: string;
}

export type EventFormData = Omit<Event, 'id'>;