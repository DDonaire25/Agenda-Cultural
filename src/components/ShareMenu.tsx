import React from 'react';
import { Share2, MessageCircle, Facebook, Mail, Link, MoreHorizontal } from 'lucide-react';
import { CulturalEvent } from '../types/event';

interface ShareMenuProps {
  event: CulturalEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const text = `¡Mira este evento! ${event.title} - ${event.description}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      },
      color: 'bg-green-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
      },
      color: 'bg-blue-600',
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        const subject = encodeURIComponent(event.title);
        const body = encodeURIComponent(`¡Mira este evento!\n\n${event.title}\n${event.description}\n\nFecha: ${event.date}\nLugar: ${event.location}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
      },
      color: 'bg-red-500',
    },
    {
      name: 'Copiar Link',
      icon: Link,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
      },
      color: 'bg-gray-600',
    },
    {
      name: 'Más',
      icon: MoreHorizontal,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: event.title,
            text: event.description,
            url: window.location.href,
          });
        }
      },
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-4 w-80" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Compartir Evento</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  onClose();
                }}
                className="flex flex-col items-center gap-1"
              >
                <div className={`${option.color} p-3 rounded-full`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-600">{option.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};