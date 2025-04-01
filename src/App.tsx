import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { useEvents } from './hooks/useEvents';
import { EventFormData } from './types';

function App() {
  const { events, addEvent, updateEvent, deleteEvent, setFilters } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormData | undefined>();

  const handleSubmit = (data: Omit<EventFormData, 'id'>) => {
    if (editingEvent) {
      updateEvent({ ...data, id: editingEvent.id });
    } else {
      addEvent(data);
    }
    setShowForm(false);
    setEditingEvent(undefined);
  };

  const handleEdit = (event: EventFormData) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(undefined);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Eventos Culturales</h1>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Evento
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                showForm ? (
                  <EventForm
                    onSubmit={handleSubmit}
                    initialData={editingEvent}
                    onCancel={handleCancel}
                  />
                ) : (
                  <EventList
                    events={events}
                    onEdit={handleEdit}
                    onDelete={deleteEvent}
                    onFilter={setFilters}
                  />
                )
              }
            />
            <Route
              path="/evento/:id"
              element={
                <EventList
                  events={events}
                  onEdit={handleEdit}
                  onDelete={deleteEvent}
                  onFilter={setFilters}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;