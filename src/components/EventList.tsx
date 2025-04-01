import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { EventCard } from './EventCard';
import { EventFormData, EventCategory, EventFilters } from '../types';

interface EventListProps {
  events: EventFormData[];
  onEdit: (event: EventFormData) => void;
  onDelete: (id: string) => void;
  onFilter: (filters: EventFilters) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEdit,
  onDelete,
  onFilter,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Search className="inline-block w-4 h-4 mr-2" />
              Buscar
            </label>
            <input
              type="text"
              onChange={(e) => onFilter({ search: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Buscar eventos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Filter className="inline-block w-4 h-4 mr-2" />
              Categoría
            </label>
            <select
              onChange={(e) => onFilter({ category: e.target.value as EventCategory })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Todas las Categorías</option>
              <option value="artes_escenicas">Artes escénicas y musicales</option>
              <option value="promocion_lectura">Promoción del libro y la lectura</option>
              <option value="audiovisual">Cine y medios audiovisuales</option>
              <option value="patrimonio">Patrimonio cultural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Fecha Inicio
            </label>
            <input
              type="date"
              onChange={(e) => onFilter({ startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Fecha Fin
            </label>
            <input
              type="date"
              onChange={(e) => onFilter({ endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No se encontraron eventos. Ajusta los filtros o crea un nuevo evento.
          </div>
        )}
      </div>
    </div>
  );
};