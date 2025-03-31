import { Event } from '../types';

type EventoProps = {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
};

export default function Evento({ event, onEdit, onDelete }: EventoProps) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>📍 {event.location} | 📅 {event.date} | 🕒 {event.time}</p>
      <p>Contacto: {event['Institution / responsible']} - {event.phone}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
}
