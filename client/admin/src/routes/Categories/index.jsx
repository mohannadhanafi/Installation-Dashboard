import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from 'util/asyncComponent';


const Table = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/Main`} component={asyncComponent(() => import('./Data'))} />
    <Route path={`${match.url}/Add`} component={asyncComponent(() => import('./AddCategory'))} />
    <Route path={`${match.url}/:id`} component={asyncComponent(() => import('./EditCategory'))} />
  </Switch>
);

export default Table;
