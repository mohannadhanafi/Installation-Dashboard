/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import './style.css';
import moment from 'moment';
import axios from 'axios';
import { convertImage } from '../../../../appRedux/actions';

export default class index extends Component {
    state = {
      title: 'category name',
      news: [

      ],
    }

    componentDidMount() {
      const { seo } = this.props;
      axios.get(`/api/v2/categories/CatWithPosts/${seo}`).then((results) => {
        const { data } = results;
        const { result, catName } = data;
        const { rows } = result;
        this.setState({ news: rows, catName });
      }).catch((error) => {

      });
    }

    render() {
      const { news, catName } = this.state;
      return (
        news.length ? (
          <section className="section-wrap relative pb-0 pt-0">
            <h2 className="heading relative heading-small uppercase bottom-line style-2 left-align">{catName}</h2>
            <div className="row">

              <ul className="posts-list">
                {news.length && news.slice(0, 6).map(element => (
                  <div className="col-md-6 mb-50">

                    <li key={uuid()}>
                      <article className="post-small clearfix">
                        <div className="col-sm-5 nopadding">
                          <div className="entry-img hover-scale">
                            <Link to={`/news/${element.category.category_seo}/${element.seo}`}>
                              <img src={`/api/v2/files/getFile/${convertImage(element.header_media[0], 'small')}`} alt="" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-7">

                          <div className="entry">
                            <h3 className="entry-title three-lines">
                              <Link to={`/news/${element.category.category_seo}/${element.seo}`}>
                                {element.title}
                              </Link>
                            </h3>
                            <ul className="entry-meta list-inline">
                              <li className="entry-date">

                                {moment(element.createdAt).calendar()}
                              </li>

                            </ul>
                          </div>
                        </div>
                      </article>
                    </li>
                  </div>

                ))}
              </ul>

            </div>
          </section>
        ) : null
      );
    }
}
