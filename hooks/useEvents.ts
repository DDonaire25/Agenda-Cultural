import { useState, useEffect } from 'react';
import { Event, EventFormData } from '../types';

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Cargar eventos al inicio
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  // Guardar en localStorage cuando cambien los eventos
 useEffect(() => {
  localStorage.setItem('events', JSON.stringify(events));
}, [events]); // <-- Dependencia correcta

  const addEvent = (formData: EventFormData) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      ...formData
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, formData: EventFormData) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...formData } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return {
    events,
    currentEvent,
    setCurrentEvent,
    addEvent,
    updateEvent,
    deleteEvent
  };
}
