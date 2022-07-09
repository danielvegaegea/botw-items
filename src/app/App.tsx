import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import VadeMecum from '../pages/VadeMecumPage';
import About from '../pages/Abuout';

// Pages
import Homepage from '../pages/Homepage';
import CounterPage from '../pages/CounterPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/counter-page" element={<CounterPage />} />
      <Route path="/vade-mecum" element={<VadeMecum />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
