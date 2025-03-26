import { create } from 'zustand';
import { CulturalEvent } from '../types/event';

interface EventStore {
  events: CulturalEvent[];
  addEvent: (event: CulturalEvent) => void;
  searchEvents: (query: string) => CulturalEvent[];
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  searchEvents: (query) => {
    const { events } = get();
    const lowercaseQuery = query.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.location.toLowerCase().includes(lowercaseQuery)
    );
  },
}));