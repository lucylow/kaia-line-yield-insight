import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Mobile-specific pages
import MobileLanding from './pages/MobileLanding';
import MobileDashboard from './pages/MobileDashboard';
import MobileGamification from './pages/MobileGamification';

const AppMobile: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Mobile Landing Page */}
          <Route path="/" element={<MobileLanding />} />
          
          {/* Mobile Dashboard */}
          <Route path="/dashboard" element={<MobileDashboard />} />
          
          {/* Mobile Gamification */}
          <Route path="/gamification" element={<MobileGamification />} />
          
          {/* Redirect any other routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppMobile;