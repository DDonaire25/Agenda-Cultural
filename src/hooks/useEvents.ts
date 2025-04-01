import { useState, useEffect } from 'react';
import { EventFormData, EventFilters } from '../types';

export const useEvents = () => {
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [filters, setFilters] = useState<EventFilters>({});

  useEffect(() => {
    const storedEvents = localStorage.getItem('culturalEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    // Check for reminders
    const checkReminders = () => {
      events.forEach(event => {
        if (event.reminder) {
          const eventTime = new Date(event.datetime).getTime();
          const reminderTime = eventTime - (12 * 60 * 60 * 1000); // 12 hours before
          const now = new Date().getTime();

          if (now >= reminderTime && now < eventTime) {
            // Show notification if supported
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Recordatorio de Evento', {
                body: `El evento "${event.title}" comenzará en menos de 12 horas`,
              });
            }
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const saveEvents = (updatedEvents: EventFormData[]) => {
    localStorage.setItem('culturalEvents', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const addEvent = (event: Omit<EventFormData, 'id'>) => {
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    saveEvents([...events, newEvent]);
  };

  const updateEvent = (event: EventFormData) => {
    const updatedEvents = events.map((e) => 
      e.id === event.id ? event : e
    );
    saveEvents(updatedEvents);
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);
  };

  const filteredEvents = () => {
    return events.filter((event) => {
      if (filters.category && event.category !== filters.category) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
        );
      }
      if (filters.startDate && new Date(event.datetime) < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && new Date(event.datetime) > new Date(filters.endDate)) {
        return false;
      }
      return true;
    });
  };

  return {
    events: filteredEvents(),
    addEvent,
    updateEvent,
    deleteEvent,
    setFilters,
  };
};