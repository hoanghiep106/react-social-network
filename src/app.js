import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import Home from './Home.js';
import AdminPage from './AdminPage.js';

render((
  <Router history={hashHistory}>
      <Route path="/" component={Home} />
      <Route path="/fullkit" component={Home}/>
      <Route path="/tank" component={Home}/>
      <Route path="/body" component={Home}/>
      <Route path="/juice" component={Home}/>
      <Route path="/accessory" component={Home}/>
      <Route path="/admin" component={AdminPage}/>
  </Router>
), document.getElementById('container'));
