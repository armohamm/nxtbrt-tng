import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './index.css';

Sentry.init({ dsn: 'https://d43ffc4ffbe0437f8594b4816d570d7c@sentry.io/282773' });

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
