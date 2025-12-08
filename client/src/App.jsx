import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import UserDashboard from './pages/user/UserDashboard.jsx';
import Home from './pages/user/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;