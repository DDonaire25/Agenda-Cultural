import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { toPng } from 'html-to-image';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { EventShareCard } from './EventShareCard';
import { EventFormData } from '../types';

interface ShareModalProps {
  event: EventFormData;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ event, onClose }) => {
  const [shareMessage, setShareMessage] = useState(
    `📢 ${event.title}\n` +
    `📅 ${new Date(event.datetime).toLocaleDateString('es-LA')}\n` +
    `🕒 ${new Date(event.datetime).toLocaleTimeString('es-LA')}\n` +
    `📍 ${event.location}\n` +
    `🔗 ${window.location.origin}/evento/${event.id}`
  );
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/evento/${event.id}`;
    await navigator.clipboard.writeText(url);
    alert('¡Enlace copiado al portapapeles!');
  };

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `${event.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Compartir Evento</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Botones de redes sociales */}
          <div className="flex justify-center space-x-4">
            <WhatsappShareButton
              url={`${window.location.origin}/evento/${event.id}`}
              title={shareMessage}
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <FacebookShareButton
              url={`${window.location.origin}/evento/${event.id}`}
              quote={shareMessage}
              hashtag="#Cultura"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={`${window.location.origin}/evento/${event.id}`}
              title={shareMessage}
              hashtags={['Cultura', 'Eventos']}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>

          {/* Mensaje personalizable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje personalizado
            </label>
            <textarea
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              className="w-full h-32 p-2 border rounded-md"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Copiar enlace
            </button>
            <button
              onClick={handleDownloadImage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Descargar imagen
            </button>
          </div>

          {/* Vista previa de la tarjeta */}
          <div ref={cardRef}>
            <EventShareCard
              title={event.title}
              datetime={event.datetime}
              location={event.location}
              url={`${window.location.origin}/evento/${event.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};