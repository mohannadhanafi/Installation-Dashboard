/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux/es';
import TopSection from './TopSection';
import Results from './Results';
import OurTeam from './OurTeam';
import Testomonials from './Testomonials';
import WhatWeDo from './WhatWeDo';

class AboutUs extends Component {
  state = {
    statistics: [],
    teamTitle: 'Creative Minds With The Extraordinary Skills',
    team: [],
    testomonials: [

    ],
  };

statisticInit = () => {
  $(document).ready(() => {
    (function ($) {
      $('.statistic').appear(() => {
        console.log(15);

        $('.timer').countTo({
          speed: 4000,
          refreshInterval: 60,
          formatter(value, options) {
            return value.toFixed(options.decimals);
          },
        });
      });
    }(window.jQuery));
  });
}

testInit = () => {
  $(document).ready(() => {
    (function ($) {
      $('#owl-testimonials').owlCarousel({

        navigation: false,
        autoHeight: true,
        slideSpeed: 300,
        pagination: true,
        paginationSpeed: 400,
        singleItem: true,
        stopOnHover: true,

      });
    }(window.jQuery));
  });
}

componentDidMount() {
  axios.get('/api/v2/team').then((result) => { 
    const { data } = result;
    this.setState({ team: data });
  });
  axios.get('/api/v2/clients').then((testomonials) => {
    const { data } = testomonials;
    this.setState({ testomonials: data });
    this.testInit();
  });
  axios.get('/api/v2/statistics').then((statistics) => {
    const { data } = statistics;
    this.setState({ statistics: data });
    this.statisticInit();
  });

  window.scrollTo(0, 0);
  $(document).ready(() => {
    (function ($) {
      $('.local-scroll').localScroll({ offset: { top: -60 }, duration: 1500, easing: 'easeInOutExpo' });

      const $section = $('#animated-skills').appear(function () {
        const bar = $('.progress-bar');
        let bar_width = $(this);

        function loadDaBars() {
          $(bar).each(function () {
            bar_width = $(this).attr('aria-valuenow');
            $(this).width(`${bar_width}%`);
          });
        }
        loadDaBars();
      });
      $('.loader').delay(1000).fadeOut();
      $('.loader-mask').delay(1500).fadeOut('slow');
      $(window).trigger('resize');
    }(window.jQuery));
  });
}

render() {
  const {
    teamTitle, team, testomonials, statistics,
  } = this.state;
  const { options } = this.props;

  return (
    <>
      <div className="loader-mask">
        <div className="loader">Loading...</div>
      </div>
      <TopSection about_title={options.length ? options[0].about_title : null} />
      <WhatWeDo about_desc={options.length ? options[0].about_desc : null} />
      <Results statistics={statistics} />
      <OurTeam teamTitle={teamTitle} team={team} />
      <Testomonials testomonials={testomonials} />
    </>
  );
}
}
const mapStateToProps = ({ options }) => options;
export default connect(mapStateToProps, null)(AboutUs);
