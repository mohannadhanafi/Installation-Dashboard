/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux/es';
import Home from './components/pages/Home';
import SingleArticle from './components/pages/SingleArticle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import About from './components/pages/AboutUs';
import Category from './components/pages/Category';
import ContactUs from './components/pages/ContactUs';
import BackToTop from './components/common/BackToTop';
import Disable from './components/common/Disable';
import { getOptions, getTrending, getRecent } from './appRedux/actions';


class App extends Component {
  state = {};

  componentWillMount() {
    this.props.getOptions();
    this.props.getTrending();
    this.props.getRecent();
  }

  render() {
    const {options} = this.props;
    if (options.length) {
      console.log(options[0])
      document.title = options[0].name;
      document.documentElement.style.setProperty('--main-color', options[0].color);
    }
    return (
      options.length && options[0].type === 'news' ? (
        options[0].active ? <Disable /> : (
          <div className="App">
            <Router>
              <Header />
              <Switch>
                <Route exact path="/news/:seoName" component={Category} />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={ContactUs} />
                <Route exact path="/news/:category/:seoName" component={SingleArticle} />
              </Switch>
            </Router>
            <Footer />
            <BackToTop />
          </div>
        )
      ) : null
    );
  }
}
const mapStateToProps = ({ options }) => options;

export default connect(mapStateToProps, { getOptions, getTrending, getRecent })(App);
