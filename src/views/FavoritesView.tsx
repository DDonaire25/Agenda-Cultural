import React from 'react';
import { EventCard } from '../components/EventCard';
import { useEventStore } from '../store/eventStore';

export const FavoritesView: React.FC = () => {
  const { events } = useEventStore();
  // Por ahora mostraremos todos los eventos, pero aquí implementaremos la lógica de favoritos
  const favoriteEvents = events;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Mis Eventos Favoritos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onShare={(id) => console.log('Compartiendo evento:', id)}
          />
        ))}
      </div>
    </div>
  );
};