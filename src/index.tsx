// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Root JS importing disabled
//import { createRoot } from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// App
import App from './app/App';
import reportWebVitals from './tools/reportWebVitals';
import './css/index.css';

// Router
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* JS importing disabled
const container = document.getElementById('root');
const root = createRoot(container); */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();