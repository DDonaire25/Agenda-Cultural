import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { Event, EventFormData } from './types';

const STORAGE_KEY = 'eventosGuardados';

function App() {
  const [events, setEvents] = useState<Event[]>(() => {
    // Load initial events from localStorage
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (formData: EventFormData) => {
    const newEvent: Event = {
      ...formData,
      id: crypto.randomUUID(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CalendarDays className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Agenda de Eventos</h1>
          <p className="mt-2 text-lg text-gray-600">
            Organiza tus eventos y mantén un registro de todos los detalles importantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nuevo Evento</h2>
            <EventForm onSubmit={handleAddEvent} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Eventos Programados
            </h2>
            <EventList events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;