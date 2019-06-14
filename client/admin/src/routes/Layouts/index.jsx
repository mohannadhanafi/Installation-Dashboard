import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from 'util/asyncComponent';


const Table = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/Home`} component={asyncComponent(() => import('./Home'))} />
  </Switch>
);

export default Table;
