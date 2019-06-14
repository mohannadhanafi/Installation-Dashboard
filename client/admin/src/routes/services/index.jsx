import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';
import './style.css';


const Table = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/services/viewServices`} />
    <Route path={`${match.url}/viewServices`} component={asyncComponent(() => import('./ViewServices'))} />
    <Route path={`${match.url}/addService`} component={asyncComponent(() => import('./AddService'))} />
    <Route path={`${match.url}/settings`} component={asyncComponent(() => import('./Settings'))} />

    <Route path={`${match.url}/:id`} component={asyncComponent(() => import('./EditService'))} />


  </Switch>
);

export default Table;
