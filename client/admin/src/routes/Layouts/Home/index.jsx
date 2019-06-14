import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from 'util/asyncComponent';


const Table = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/view`} component={asyncComponent(() => import('./View'))} />
    <Route path={`${match.url}/:id`} component={asyncComponent(() => import('./Edit'))} />
  </Switch>
);

export default Table;
