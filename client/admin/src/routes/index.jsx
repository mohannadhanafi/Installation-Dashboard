import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from 'util/asyncComponent';


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}/users`} component={asyncComponent(() => import('./Users'))} />
      <Route path={`${match.url}/services`} component={asyncComponent(() => import('./services'))} />
      <Route path={`${match.url}/blogs`} component={asyncComponent(() => import('./Blogs'))} />
      <Route path={`${match.url}/testimonials`} component={asyncComponent(() => import('./Testimonials'))} />
      <Route path={`${match.url}/features`} component={asyncComponent(() => import('./Features'))} />
      <Route path={`${match.url}/settings`} component={asyncComponent(() => import('./Options'))} />
      <Route path={`${match.url}/partners`} component={asyncComponent(() => import('./Partners'))} />
      <Route path={`${match.url}/hero`} component={asyncComponent(() => import('./Hero'))} />
      <Route path={`${match.url}/teams`} component={asyncComponent(() => import('./Teams'))} />
      <Route path={`${match.url}/categories`} component={asyncComponent(() => import('./Categories'))} />
      <Route path={`${match.url}/core`} component={asyncComponent(() => import('./services.1'))} />
      <Route path={`${match.url}/about`} component={asyncComponent(() => import('./About'))} />
      <Route path={`${match.url}/whyUs`} component={asyncComponent(() => import('./WhyUs'))} />
      <Route path={`${match.url}/statistics`} component={asyncComponent(() => import('./Statistics'))} />
      <Route path={`${match.url}/pricing`} component={asyncComponent(() => import('./PricingPlans'))} />
      <Route path={`${match.url}/portfolio`} component={asyncComponent(() => import('./Porfolio'))} />
      <Route path={`${match.url}/portfolioCategory`} component={asyncComponent(() => import('./PortfolioCategory'))} />
      <Route path={`${match.url}/comments/:status`} component={asyncComponent(() => import('./Comments'))} />
      <Route path={`${match.url}/news/comments/:status`} component={asyncComponent(() => import('./NewsComments'))} />
      <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./Profile'))} />
      <Route path={`${match.url}/Posts`} component={asyncComponent(() => import('./Posts'))} />
      <Route path={`${match.url}/gallery`} component={asyncComponent(() => import('./Gallery'))} />
      <Route path={`${match.url}/layouts`} component={asyncComponent(() => import('./Layouts'))} />
      <Route path={`${match.url}/ads`} component={asyncComponent(() => import('./Ads'))} />
      <Route path={`${match.url}/layout`} component={asyncComponent(() => import('./Layout'))} />
      <Route
        path="*"
        render={() => (
          <Redirect to={`${match.url}/main`} />
        )}
      />
    </Switch>
  </div>
);

export default App;
