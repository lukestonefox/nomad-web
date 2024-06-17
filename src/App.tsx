import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import TripPlanner from './pages/TripPlanner';
import { StarredProvider } from './components/StarredContext';
import { MapProvider } from './components/MapContext';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <StarredProvider>
      <MapProvider>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trip-planner" element={<TripPlanner />} /> {/* Add route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MapProvider>
    </StarredProvider>
  );
};

export default App;