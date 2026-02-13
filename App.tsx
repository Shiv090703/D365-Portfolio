import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import EntityList from './pages/EntityList';
import RecordDetail from './pages/RecordDetail';
import About from './pages/About';
import IntroAnimation from './components/IntroAnimation';
import { EntityType } from './types';
import { ThemeProvider } from '@/ThemeContext';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <ThemeProvider>
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Portfolio Sections (Mapped to EntityLists) */}
              <Route path="/projects" element={<EntityList entityType="Projects" />} />
              <Route path="/experience" element={<EntityList entityType="Experience" />} />
              <Route path="/education" element={<EntityList entityType="Education" />} />

              {/* Legacy/Utility Lists */}
              <Route path="/activities" element={<EntityList entityType={EntityType.Activity} />} />

              {/* Record Details (Reusing generic detail view for now) */}
              <Route path="/projects/:id" element={<RecordDetail entityType={EntityType.Opportunity} />} />
              <Route path="/experience/:id" element={<RecordDetail entityType={EntityType.Account} />} />
              <Route path="/education/:id" element={<RecordDetail entityType={EntityType.Contact} />} />

              {/* Detailed About Me Page */}
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;