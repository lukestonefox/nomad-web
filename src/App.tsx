// import './App.css'

// function App() {

//   return (
//     <>
//       <div>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { StarredProvider } from './components/StarredContext';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <StarredProvider>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StarredProvider>
  );
};

export default App;

