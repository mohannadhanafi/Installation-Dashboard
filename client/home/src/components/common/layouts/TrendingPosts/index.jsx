/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { connect } from 'react-redux/es';

import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import TabCats from './TabCats';
import { convertImage } from '../../../../appRedux/actions';

class TrendingPosts extends Component {
  state = {
    finalData: [],
    Trending: [],
    categories: ['WORLD', 'SPORTS', 'TRAVEL', 'fashion'],

  };


  render() {
    const {
      categories, news,
    } = this.state;
    const { trendingPosts: { Trending, finalData } } = this.props;
    return (
      Trending.length ? (
        <section className="section-wrap relative pb-0 pt-0">
          <h2 className="heading relative heading-small uppercase bottom-line style-2 left-align">
          trending news
          </h2>
          <div className="cat-filter tabs">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href="#tab-all" data-toggle="tab">
                all
                </a>
              </li>
              {finalData.length && finalData.map(category => (
                <li>
                  <a href={`#tab-${category.categoryDetails.name.replace(/ /g, '')}`} data-toggle="tab">
                    {category.categoryDetails.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="row">
            <div className="tab-content clearfix nopadding">
              <div className="tab-pane fade in active" id="tab-all">
                <div className="col-md-6 mb-50">
                  {Trending.length && Trending[0] ? (
                    <article>
                      <div className="entry-img hover-scale">

                        <a
                          href={`/news/${Trending[0].category.seo}/${Trending[0].seo}`}
                          className="entry-category-label blue"
                        >
                          {Trending[0].category.name}
                        </a>
                        <a href={`/news/${Trending[0].category.seo}/${Trending[0].seo}`}>
                          <img src={`/api/v2/files/getFile/${convertImage(Trending[0].header_media[0], 'medium')}`} alt="" />
                        </a>
                      </div>
                      <div className="entry mb-0">
                        <h2 className="entry-title three-lines fix-height">
                          <a href={`/news/${Trending[0].category.seo}/${Trending[0].seo}`}>
                            {Trending[0].title}
                          </a>
                        </h2>
                        <ul className="entry-meta list-inline">
                          <li className="entry-date">
                            {moment(Trending[0].createdAt).calendar()}
                          </li>
                        </ul>
                        <div className="entry-content">
                          <p className="three-lines fix-height">
                            {ReactHtmlParser(Trending[0].description)}
                          </p>
                          <a
                            href={`/news/${Trending[0].category.seo}/${Trending[0].seo}`}
                            className="read-more dark-link"
                          >
      Read More <i className="fa fa-angle-right" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ) : null}
                  <ul className="posts-list">

                    {Trending.length ? Trending.slice(1, 4).map(post => (
                      <li>
                        <article className="post-small clearfix">
                          <div className="col-sm-5 nopadding pl-15">
                            <div className="entry-img hover-scale">
                              <a href={`/news/${post.category.seo}/${post.seo}`}>
                                <img src={`/api/v2/files/getFile/${convertImage(post.header_media[0], 'small')}`} alt="" />
                              </a>
                            </div>
                          </div>
                          <div className="col-sm-7 pl-15">

                            <div className="entry">
                              <h3 className="entry-title three-lines">
                                <a href={`/news/${post.category.seo}/${post.seo}`}>
                                  {post.title}
                                </a>
                              </h3>
                              <ul className="entry-meta list-inline">
                                <li className="entry-date">
                                  {moment(post.createdAt).calendar()}
                                </li>

                              </ul>
                            </div>
                          </div>
                        </article>
                      </li>
                    )) : null}
                  </ul>

                </div>
                <div className="col-md-6 mb-50">
                  {Trending.length && Trending[4] ? (
                    <article>
                      <div className="entry-img hover-scale">
                        <a
                          href={`/news/${Trending[4].category.seo}/${Trending[4].seo}`}
                          className="entry-category-label blue"
                        >
                          {Trending[4].category.name}
                        </a>
                        <a href={`/news/${Trending[4].category.seo}/${Trending[4].seo}`}>
                          <img src={`/api/v2/files/getFile/${convertImage(Trending[4].header_media[0], 'medium')}`} alt="" />
                        </a>
                      </div>
                      <div className="entry mb-0">
                        <h2 className="entry-title three-lines">
                          <a href={`/news/${Trending[4].category.seo}/${Trending[4].seo}`}>
                            {Trending[4].title}
                          </a>
                        </h2>
                        <ul className="entry-meta list-inline">
                          <li className="entry-date">
                            {moment(Trending[4].createdAt).calendar()}
                          </li>
                        </ul>
                        <div className="entry-content">
                          <p className="three-lines fix-height">
                            {ReactHtmlParser(Trending[4].description)}
                          </p>
                          <a
                            href={`/news/${Trending[4].category.seo}/${Trending[4].seo}`}
                            className="read-more dark-link"
                          >
      Read More <i className="fa fa-angle-right" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ) : null}
                  <ul className="posts-list">

                    {Trending.length ? Trending.slice(5, 8).map(post => (
                      <li>
                        <article className="post-small clearfix">
                          <div className="col-sm-5 nopadding pl-15">

                            <div className="entry-img hover-scale">
                              <a href={`/news/${post.category.seo}/${post.seo}`}>
                                <img src={`/api/v2/files/getFile/${convertImage(post.header_media[0], 'small')}`} alt="" />
                              </a>
                            </div>
                          </div>
                          <div className="col-sm-7 pl-15">
                            <div className="entry">
                              <h3 className="entry-title three-lines fix-height">
                                <a href={`/news/${post.category.seo}/${post.seo}`}>
                                  {post.title}
                                </a>
                              </h3>
                              <ul className="entry-meta list-inline">
                                <li className="entry-date">
                                  {moment(post.createdAt).calendar()}
                                </li>

                              </ul>
                            </div>
                          </div>
                        </article>
                      </li>
                    )) : null}
                  </ul>

                </div>

              </div>
              {finalData.length ? finalData.map(category => (<TabCats data={category} />)) : null}
            </div>

          </div>
        </section>
      ) : null
    );
  }
}
const mapStateToProps = ({ trending }) => trending;

export default connect(mapStateToProps, { convertImage })(withRouter(TrendingPosts));
