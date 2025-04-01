import React from 'react';
import QRCode from 'react-qr-code';
import { Calendar, MapPin } from 'lucide-react';

interface EventShareCardProps {
  title: string;
  datetime: string;
  location: string;
  url: string;
}

export const EventShareCard: React.FC<EventShareCardProps> = ({
  title,
  datetime,
  location,
  url,
}) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-LA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          {formatDate(datetime)}
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          {location}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <QRCode
          value={url}
          size={200}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="text-sm text-gray-500 text-center">
        Escanea el código QR para más información
      </div>
    </div>
  );
};