import React from 'react';
import { Settings, Calendar, Bell, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const profileMenuItems = [
    {
      icon: Settings,
      label: 'Configuración',
      action: () => console.log('Configuración'),
    },
    {
      icon: Calendar,
      label: 'Mis Eventos',
      action: () => console.log('Mis Eventos'),
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      action: () => console.log('Notificaciones'),
    },
    {
      icon: LogOut,
      label: 'Cerrar Sesión',
      action: () => console.log('Cerrar Sesión'),
      className: 'text-red-600',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Perfil"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">Usuario Actual</h2>
            <p className="text-gray-600">usuario@ejemplo.com</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {profileMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 ${
                index !== profileMenuItems.length - 1 ? 'border-b border-gray-200' : ''
              } ${item.className || 'text-gray-700'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};