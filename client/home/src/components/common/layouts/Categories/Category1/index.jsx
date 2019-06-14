/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { convertImage } from '../../../../../appRedux/actions';

export default class index extends Component {
    state = {
      title: 'Sport',
      news: [],
    }

    render() {
      const { news, title } = this.props;
      return (
        news.length ? (
          <div className="col-md-4 mb-50">
            <h2 className="heading relative heading-small uppercase bottom-line style-2 left-align heading-label-red">{title}</h2>
            <article>
              <div className="entry-img hover-scale">
                <Link to={`/news/${news[0].category.category_seo}/${news[0].seo}`}>
                  <img src={`/api/v2/files/getFile/${convertImage(news[0].header_media[0], 'medium')}`} alt="bg" />
                </Link>
              </div>
              <div className="entry mb-0">
                <h2 className="entry-title small three-lines"><Link to={`/news/${news[0].category.category_seo}/${news[0].seo}`}>{news[0].title}</Link></h2>
                <ul className="entry-meta list-inline">
                  <li className="entry-date">
                    <Link to={`/news/${news[0].category.category_seo}/${news[0].seo}`}>{moment(news[0].createdAt).calendar()}</Link>
                  </li>
                </ul>
                <div className="entry-content">
                  <p className="three-lines">{ReactHtmlParser(news[0].post_intro)}</p>
                  <Link to={`/news/${news[0].category.category_seo}/${news[0].seo}`} className="read-more dark-link">Read More<i className="fa fa-angle-right" />
                  </Link>
                </div>
              </div>
            </article>
            <ul className="posts-list">
              {news.slice(1, 4).map(element => (
                <li>
                  <article className="post-small clearfix">
                    <div className="entry">
                      <h3 className="entry-title three-lines"><Link to={`/news/${element.category.category_seo}/${element.seo}`}>{element.title}</Link></h3>
                      <ul className="entry-meta list-inline">
                        <li className="entry-date">
                          <Link to={`/news/${element.category.category_seo}/${element.seo}`}>{moment(element.createdAt).calendar()}</Link>
                        </li>
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      );
    }
}
