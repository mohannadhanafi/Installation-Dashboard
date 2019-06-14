import React, { Component } from 'react';
import $ from 'jquery';
import Breaking from '../../common/Breaking';
import Hero from '../../common/Hero';
import Body from './Body';

export default class index extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    $(document).ready(() => {
      (function ($) {
        $('.loader').delay(1000).fadeOut();
        $('.loader-mask').delay(1500).fadeOut('slow');

        $(window).trigger('resize');
      }(window.jQuery));
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <>

        <div className="loader-mask">
          <div className="loader">Loading...</div>
        </div>
        <Breaking />
        <Hero />
        <Body />
      </>

    );
  }
}
