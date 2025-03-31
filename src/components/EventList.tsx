import React from 'react';
import { Calendar, MapPin, Phone, Instagram } from 'lucide-react';
import { Event } from '../types';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{event.description}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {event.date} - {event.time}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="font-medium text-sm text-gray-900">{event.responsible}</p>
              
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {event.phone}
                </div>
                
                {event.instagram && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Instagram className="h-4 w-4 mr-1" />
                    @{event.instagram}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}