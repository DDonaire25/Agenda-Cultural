import useEvents from './hooks/useEvents';
import Evento from './components/Evento';
import EventForm from './components/EventForm';

export default function App() {
  const {
    events,
    currentEvent,
    setCurrentEvent,
    addEvent,
    updateEvent,
    deleteEvent
  } = useEvents();

  const handleSubmit = (data: EventFormData) => {
    if (currentEvent) {
      updateEvent(currentEvent.id, data);
    } else {
      addEvent(data);
    }
    setCurrentEvent(null);
  };

  return (
    <div>
      <h1>Agenda Cultural</h1>
      
      <EventForm
        initialData={currentEvent || undefined}
        onSubmit={handleSubmit}
      />

      <div className="event-list">
        {events.map(event => (
          <Evento
            key={event.id}
            event={event}
            onEdit={() => setCurrentEvent(event)}
            onDelete={() => deleteEvent(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
