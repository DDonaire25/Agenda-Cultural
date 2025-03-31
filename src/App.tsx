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
const [filter, setFilter] = useState<string>('');

const filteredEvents = filter
  ? events.filter(event => 
      event['Institution / responsible'].toLowerCase().includes(filter.toLowerCase())
    )
  : events;

// En el JSX:
<input
  type="text"
  placeholder="Filtrar por institución"
  onChange={(e) => setFilter(e.target.value)}
/>
