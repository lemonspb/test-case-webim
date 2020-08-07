import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import PageLogin from './Pages/PageLogin'
import PageMain from './Pages/PageMain'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




ReactDOM.render(
  <Router>
    <Switch>
      {window.localStorage.token && <Route path='/main' exact render={() => <PageMain />} />}
      <Route path='/' render={() => <PageLogin />} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

