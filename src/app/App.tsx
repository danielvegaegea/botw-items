// React
import React from 'react';
// Helmet
import { HelmetProvider } from 'react-helmet-async';
// Redux
import { Provider } from 'react-redux';
import { store } from './store';
// Router
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Pages
import BotwHeader from '../components/BotwHeader';
import BotwFooter from '../components/BotwFooter';
import Homepage from '../pages/Homepage';
import VadeMecum from '../pages/VadeMecumPage';
import MasterVadeMecum from '../pages/VadeMecumMasterPage';
import CompendiumPage from '../pages/CompendiumPage';
import CompendiumMasterPage from '../pages/CompendiumMasterPage';
import About from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';
import CounterPage from '../pages/CounterPage';
//  Styles
import '../css/normalize.css';
import '../css/common.css';

const App = () => {
  return (
    <div className="background">
      <Provider store={store}>
        <Router>
          <HelmetProvider>
            <div className="page-container">
              <BotwHeader />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/counter-page" element={<CounterPage />} />
                <Route path="/vade-mecum" element={<VadeMecum />} />
                <Route
                  path="/master-vade-mecum"
                  element={<MasterVadeMecum />}
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/compendium/:isoCode"
                  element={<CompendiumPage />}
                />
                <Route
                  path="/master-compendium/:isoCode"
                  element={<CompendiumMasterPage />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
            <BotwFooter />
          </HelmetProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
