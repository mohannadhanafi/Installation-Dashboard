/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './style.css';
import { convertImage } from '../../../../appRedux/actions';

export default class index extends Component {
    state = {
      title: '',
      news: [],
    }

    componentDidMount() {
      axios('/api/v2/categories/CatWithPosts/main').then((result) => {
        const { data: { catName: title, result: { rows } } } = result;
        this.setState(() => ({ title, news: rows }));
      });
    }

    render() {
      const { title, news } = this.state;
      return (
        news.length ? (
          <section className="section-wrap relative pb-70 pt-0">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="heading relative heading-small uppercase bottom-line style-2 left-align">{title}</h2>
                <ul className="posts-list no-top-pad clearfix">
                  {news.slice(0, 3).map(element => (
                    <li key={uuid()} className="clearfix">
                      <article>
                        <div className="col-sm-5 nopadding">

                          <div className="entry-img hover-scale">
                            <Link to={`/news/${element.category.category_seo}/${element.seo}`} className="entry-category-label green">{element.category.category_name}</Link>
                            <Link to={`/news/${element.category.category_seo}/${element.seo}`}>
                              <img className="editor--img" src={element.header_media && `/api/v2/files/getFile/${convertImage(element.header_media[0], 'medium')}`} alt="bg" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-7">

                          <div className="entry">
                            <h2 className="entry-title three-lines"><Link to={`/news/${element.category.category_seo}/${element.seo}`}>{element.title}</Link></h2>
                            <ul className="entry-meta list-inline">
                              <li className="entry-date">
                                {moment(element.createdAt).calendar()}
                              </li>

                            </ul>

                            <div className="entry-content">
                              <p className="three-lines">{element.post_intro}</p>
                              <Link to={`/news/${element.category.category_seo}/${element.seo}`} className="read-more dark-link">Read More<i className="fa fa-angle-right" />
                              </Link>
                            </div>
                          </div>
                        </div>

                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null
      );
    }
}
