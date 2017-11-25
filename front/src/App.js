import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import CanvasPage from './components/canvas.page';
import HomePage from './components/home.page'

export default () => (
  <Router>
    <div className="col flex-center">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/draw/:id" component={CanvasPage} />
    </div>
  </Router>
);
