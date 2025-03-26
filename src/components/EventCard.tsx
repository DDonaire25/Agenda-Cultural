import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, MapPin, Share2, Users } from 'lucide-react';
import { CulturalEvent } from '../types/event';
import { ShareMenu } from './ShareMenu';

interface EventCardProps {
  event: CulturalEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          <span className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
            {event.category}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(event.date, 'PPP', { locale: es })}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.attendees.length} asistentes</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm text-gray-700">{event.organizer.name}</span>
          </div>
          
          <button
            onClick={() => setIsShareMenuOpen(true)}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Compartir
          </button>
        </div>
      </div>

      <ShareMenu
        event={event}
        isOpen={isShareMenuOpen}
        onClose={() => setIsShareMenuOpen(false)}
      />
    </div>
  );
};