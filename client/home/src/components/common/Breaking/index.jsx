/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';

export default class index extends Component {
  state = {
    breaking: [],
  };

  componentDidMount() {
    axios('/api/v2/categories/related').then((result) => {
      const { data } = result;
      this.setState({ breaking: data });
    }).then(() => {
      $(document).ready(() => {
        (function ($) {
          $('#ticker').flexslider({
            animation: 'slide',
            controlNav: false,
            animationLoop: true,
            slideshow: true,
            touch: true,
            slideshowSpeed: 4000,
            prevText: ['<i class=\'fa fa-angle-left\'></i>'],
            nextText: ['<i class=\'fa fa-angle-right\'></i>'],
          });
        }(window.jQuery));
      });
    });
  }

  render() {
    const { breaking } = this.state;
    return (
      breaking.length ? (
        <div className="container">
          <div className="breaking-news mt-30 clearfix">
            <span className="uppercase">Breaking News:</span>
            <div id="ticker" className="flexslider">
              <ul className="slides clearfix">
                {breaking.map(post => (
                  <li>
                    <Link to={`/news/${post.category.seo}/${post.seo}`}>
                      <time>{moment(post.createdAt).format('HH:mm')}</time> {` ${post.title}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null
    );
  }
}
