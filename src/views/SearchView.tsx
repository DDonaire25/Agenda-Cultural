import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { useEventStore } from '../store/eventStore';

export const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { events, searchEvents } = useEventStore();
  
  const filteredEvents = searchQuery ? searchEvents(searchQuery) : events;

  const handleShare = (eventId: string) => {
    console.log('Compartiendo evento:', eventId);
  };

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onShare={() => handleShare(event.id)}
          />
        ))}
      </div>
    </div>
  );
};