import React from 'react';
import BotwHeader from '../components/BotwHeader';
import BotwFooter from '../components/BotwFooter';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import VadeMecum from '../pages/VadeMecumPage';
import About from '../pages/About';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Pages
import Homepage from '../pages/Homepage';
import CounterPage from '../pages/CounterPage';
import CompendiumPage from '../pages/CompendiumPage';

const App = () => {
  return (
    <div className="background">
      <HelmetProvider>
        <BotwHeader />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/counter-page" element={<CounterPage />} />
          <Route path="/vade-mecum" element={<VadeMecum />} />
          <Route path="/about" element={<About />} />
          <Route path="/compendium/:isoCode" element={<CompendiumPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <BotwFooter />
      </HelmetProvider>
    </div>
  );
};

export default App;
