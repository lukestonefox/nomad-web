import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import TripPlanner from './pages/TripPlanner';
import { StarredProvider } from './components/StarredContext';
import { MapProvider } from './components/MapContext';
import Sidebar from './components/Sidebar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isTripPlannerPage = location.pathname === '/trip-planner';

  return (
    <>
      {!isTripPlannerPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <StarredProvider>
      <MapProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <AppContent />
          </Router>
        </DndProvider>
      </MapProvider>
    </StarredProvider>
  );
};

export default App;