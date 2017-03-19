import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './index.css';

import store from './redux-plumbing/store';
import Stations from './components/Stations';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Stations} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
