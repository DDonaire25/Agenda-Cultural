import React from 'react';
import { Search, Heart, PlusCircle, User } from 'lucide-react';
import { useViewStore } from '../store/viewStore';
import clsx from 'clsx';

export const BottomNavigation: React.FC = () => {
  const { currentView, setView } = useViewStore();

  const NavButton = ({ view, icon: Icon, label }: { view: string; icon: any; label: string }) => {
    const isActive = currentView === view;
    const isCreate = view === 'create';

    return (
      <button
        onClick={() => setView(view as any)}
        className={clsx(
          'flex flex-col items-center px-4 py-2',
          isCreate ? 'text-purple-600' : isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
        )}
      >
        {isCreate ? (
          <div className="bg-purple-600 rounded-full p-3 -mt-8 shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        ) : (
          <Icon className="w-6 h-6" />
        )}
        <span className="text-xs mt-1">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-around items-center">
        <NavButton view="search" icon={Search} label="Buscar" />
        <NavButton view="favorites" icon={Heart} label="Favoritos" />
        <NavButton view="create" icon={PlusCircle} label="Crear" />
        <NavButton view="profile" icon={User} label="Perfil" />
      </div>
    </nav>
  );
};