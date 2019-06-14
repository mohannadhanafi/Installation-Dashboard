import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';


const Table = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/Posts/viewPosts/all`} />
    <Route path={`${match.url}/viewPosts/:status`} component={asyncComponent(() => import('./ViewPosts'))} />
    <Route path={`${match.url}/AddPost`} component={asyncComponent(() => import('./AddPost'))} />
    <Route path={`${match.url}/hero/view`} component={asyncComponent(() => import('./Hero/View'))} />
    <Route path={`${match.url}/hero/add`} component={asyncComponent(() => import('./Hero/Add'))} />
    <Route path={`${match.url}/:id`} component={asyncComponent(() => import('./EditPost'))} />
  </Switch>
);

export default Table;
