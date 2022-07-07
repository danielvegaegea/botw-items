import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Homepage from '../pages/Homepage';
/* import CounterPage from '../pages/CounterPage'; */

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/counter-page" element={<CounterPage />} /> */}
    </Routes>
  );
};

export default App;
