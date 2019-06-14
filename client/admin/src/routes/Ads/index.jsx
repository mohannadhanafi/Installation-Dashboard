import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from 'util/asyncComponent';


const Table = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/add`} component={asyncComponent(() => import('./AddAds'))} />
    <Route path={`${match.url}/view`} component={asyncComponent(() => import('./ViewAds'))} />
    <Route path={`${match.url}/:id`} component={asyncComponent(() => import('./EditAds'))} />
  </Switch>
);

export default Table;
