import { EventFormData } from '../types';

type EventFormProps = {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
};

export default function EventForm({ initialData, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData || {
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    'Institution / responsible': '',
    phone: '',
    instagram: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      {/* Repite para los demás campos */}
      <button type="submit">
        {initialData ? 'Actualizar' : 'Crear'} Evento
      </button>
    </form>
  );
}
