import React from 'react';
import { Calendar } from 'lucide-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BottomNavigation } from './components/BottomNavigation';
import { SearchView } from './views/SearchView';
import { FavoritesView } from './views/FavoritesView';
import { CreateEventView } from './views/CreateEventView';
import { ProfileView } from './views/ProfileView';
import { useViewStore } from './store/viewStore';

function App() {
  const { currentView } = useViewStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'search':
        return <SearchView />;
      case 'favorites':
        return <FavoritesView />;
      case 'create':
        return <CreateEventView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <SearchView />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">AgendaCultural</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCurrentView()}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;