import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import './app/layout/styles.css';
import history from './history';
import ScrollToTop from './app/layout/ScrollToTop';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
