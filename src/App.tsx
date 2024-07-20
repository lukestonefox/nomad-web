import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import TripScheduler from './pages/TripScheduler';
import { StarredProvider } from './components/StarredContext';
import { MapProvider } from './components/MapContext';
import Sidebar from './components/Sidebar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isTripSchedulerPage = location.pathname === '/trip-scheduler';

  return (
    <>
      {!isTripSchedulerPage && <Sidebar visible={false}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip-scheduler" element={<TripScheduler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <StarredProvider>
      <MapProvider>
        <Router>
          <AppContent />
        </Router>
      </MapProvider>
    </StarredProvider>
  );
};

export default App;
