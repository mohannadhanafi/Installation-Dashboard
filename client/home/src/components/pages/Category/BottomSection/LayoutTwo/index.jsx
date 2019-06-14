/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import moment from 'moment';
import './style.css';

export default class index extends Component {
  state={}

  render() {
    const {
      posts, total, changeData, catNo,
    } = this.props;
    return (
      <section className="section-wrap relative pb-70 pt-0">
        <div className="row">
          <div className="col-sm-12 mb-50">
            <ul className="posts-list no-top-pad clearfix">
              {posts && posts.map(element => (
                <li key={uuid()} className="clearfix">
                  <article>
                    <div className="col-sm-5 nopadding">

                      <div className="entry-img hover-scale">
                        <Link to={`/news/${element.category.category_seo}/${element.seo}`}>
                          <img className="editor--img" src={element.header_media && `/api/v2/files/getFile/${element.header_media[0]}`} alt="bg" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm-7">

                      <div className="entry">
                        <h2 className="entry-title"><Link to={`/news/${element.category.category_seo}/${element.seo}`}>{element.title}</Link></h2>
                        <ul className="entry-meta list-inline">
                          <li className="entry-date">
                            {moment(element.createdAt).calendar()}
                          </li>
                        </ul>
                        <div className="entry-content">
                          <p>{element.post_intro}</p>
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
        <div className="pagination clear">
          <Pagination
            hideOnSinglePage
            total={total}
            defaultPageSize={catNo || 1}
            onChange={changeData}
          />
        </div>
      </section>

    );
  }
}
