import React from 'react';
import { Calendar, MapPin, User, Phone, Instagram, Users, Ticket, Bell } from 'lucide-react';
import { EventFormData } from '../types';

interface EventCardProps {
  event: EventFormData;
  onEdit: (event: EventFormData) => void;
  onDelete: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-LA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryName = (category: string) => {
    const categories = {
      artes_escenicas: 'Artes escénicas y musicales',
      promocion_lectura: 'Promoción del libro y la lectura',
      audiovisual: 'Cine y medios audiovisuales',
      patrimonio: 'Patrimonio cultural'
    };
    return categories[category as keyof typeof categories];
  };

  const getActivityTypeName = (type: string) => {
    const types = {
      taller: 'Taller',
      exposicion: 'Exposición',
      festival: 'Festival',
      reunion: 'Reunión o Asamblea',
      comunitaria: 'Actividad Comunitaria',
      otro: 'Otro'
    };
    return types[type as keyof typeof types];
  };

  const getAudienceName = (audience: string) => {
    const audiences = {
      children: 'Niños',
      adults: 'Adultos',
      all: 'Todas las edades'
    };
    return audiences[audience as keyof typeof audiences];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-block px-2 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                {getCategoryName(event.category)}
              </span>
              <span className="inline-block px-2 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
                {getActivityTypeName(event.activityType)}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(event)}
              className="text-gray-600 hover:text-indigo-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="text-gray-600 hover:text-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>

        <p className="mt-4 text-gray-600">{event.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.datetime)}
            {event.reminder && (
              <Bell className="w-4 h-4 ml-2 text-indigo-600" title="Recordatorio activado" />
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
            {event.locationUrl && (
              <a
                href={event.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                (Ver mapa)
              </a>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            {event.responsibleName}
          </div>

          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {event.contactPhone}
          </div>

          {event.socialMedia && (
            <div className="flex items-center text-gray-600">
              <Instagram className="w-4 h-4 mr-2" />
              @{event.socialMedia}
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {getAudienceName(event.targetAudience)}
          </div>

          <div className="flex items-center text-gray-600">
            <Ticket className="w-4 h-4 mr-2" />
            {event.price.isFree ? 'Gratuito' : `$${event.price.amount?.toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};