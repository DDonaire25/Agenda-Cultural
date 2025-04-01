import React, { useState } from 'react';
import { Calendar, MapPin, User, Phone, Instagram, Image, Users, Ticket, Bell } from 'lucide-react';
import { EventFormData, EventCategory, TargetAudience, ActivityType } from '../types';

interface EventFormProps {
  onSubmit: (data: Omit<EventFormData, 'id'>) => void;
  initialData?: EventFormData;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<Omit<EventFormData, 'id'>>({
    title: initialData?.title ?? '',
    activityType: initialData?.activityType ?? 'taller',
    description: initialData?.description ?? '',
    category: initialData?.category ?? 'artes_escenicas',
    datetime: initialData?.datetime ?? '',
    location: initialData?.location ?? '',
    locationUrl: initialData?.locationUrl ?? '',
    responsibleName: initialData?.responsibleName ?? '',
    contactPhone: initialData?.contactPhone ?? '',
    socialMedia: initialData?.socialMedia ?? '',
    imageUrl: initialData?.imageUrl ?? '',
    targetAudience: initialData?.targetAudience ?? 'all',
    reminder: initialData?.reminder ?? false,
    price: initialData?.price ?? { isFree: true },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? 'Editar Evento' : 'Crear Nuevo Evento'}
        </h2>

        {/* Información Básica */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Actividad</label>
            <select
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value as ActivityType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="taller">Taller</option>
              <option value="exposicion">Exposición</option>
              <option value="festival">Festival</option>
              <option value="reunion">Reunión o Asamblea</option>
              <option value="comunitaria">Actividad Comunitaria</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              maxLength={500}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="artes_escenicas">Artes escénicas y musicales</option>
              <option value="promocion_lectura">Promoción del libro y la lectura</option>
              <option value="audiovisual">Cine y medios audiovisuales</option>
              <option value="patrimonio">Patrimonio cultural</option>
            </select>
          </div>
        </div>

        {/* Fecha y Ubicación */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              required
              value={formData.datetime}
              onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="reminder"
              checked={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="reminder" className="text-sm text-gray-700 flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Recordarme 12 horas antes
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <MapPin className="inline-block w-4 h-4 mr-2" />
              Ubicación
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL de Google Maps</label>
            <input
              type="url"
              value={formData.locationUrl}
              onChange={(e) => setFormData({ ...formData, locationUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <User className="inline-block w-4 h-4 mr-2" />
              Nombre del Responsable
            </label>
            <input
              type="text"
              required
              value={formData.responsibleName}
              onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Phone className="inline-block w-4 h-4 mr-2" />
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              required
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Instagram className="inline-block w-4 h-4 mr-2" />
              Redes Sociales
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                @
              </span>
              <input
                type="text"
                value={formData.socialMedia}
                onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Detalles Adicionales */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Image className="inline-block w-4 h-4 mr-2" />
              URL de la Imagen
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Users className="inline-block w-4 h-4 mr-2" />
              Público Objetivo
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as TargetAudience })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="children">Niños</option>
              <option value="adults">Adultos</option>
              <option value="all">Todas las edades</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Ticket className="inline-block w-4 h-4 mr-2" />
              Precio
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.price.isFree}
                  onChange={() => setFormData({ ...formData, price: { isFree: true } })}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Gratuito</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!formData.price.isFree}
                  onChange={() => setFormData({ ...formData, price: { isFree: false, amount: formData.price.amount || 0 } })}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Pago</span>
              </label>
            </div>
            {!formData.price.isFree && (
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price.amount}
                onChange={(e) => setFormData({
                  ...formData,
                  price: { isFree: false, amount: parseFloat(e.target.value) }
                })}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {initialData ? 'Actualizar Evento' : 'Crear Evento'}
        </button>
      </div>
    </form>
  );
};