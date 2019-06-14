import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import axios from 'axios';
import './style.css';
import { convertImage } from '../../../../appRedux/actions';

export default class index extends Component {
    state ={
      title: 'News In Picture',
      news: [],
    }

    componentDidMount() {
      const { seo } = this.props;
      axios(`/api/v2/categories/CatWithPosts/${seo}`).then((result) => {
        const { data: { catName: title, result: { rows } } } = result;
        this.setState(() => ({ title, news: rows }));
      });
    }

    render() {
      const { title, news } = this.state;
      return (
        news.length ? (
          <section className="section-wrap relative news-pictures pb-50 pt-0">
            <h2 className="heading relative heading-small uppercase bottom-line style-2 left-align">{title}</h2>
            <div className="row small-spacing">
              <div className="col-sm-6">
                <article className="entry-img hover-scale post-1">
                  <Link to={news[0].category && `/news/${news[0].category.category_seo}/${news[0].seo}`} className="gradient">
                    <img className="news--in--pictures-first" src={`/api/v2/files/getFile/${convertImage(news[0].header_media[0], 'large')}`} alt="bg" />
                  </Link>
                  <div className="entry-inner small">
                    <div className="entry">
                      <h2 className="entry-title color-white mb-0 three-lines"><Link to={news[0].category && `/news/${news[0].category.category_seo}/${news[0].seo}`}>{news[0].title}</Link></h2>
                    </div>
                  </div>
                </article>
              </div>
              {news.length > 1 ? (
                <div className="col-sm-6">
                  <ul className="gallery-list clearfix">
                    {news.slice(1, 10).map(element => (
                      <li key={uuid()}>
                        <article className="entry-img hover-scale">
                          <Link to={element.category && `/news/${element.category.category_seo}/${element.seo}`}>
                            <img className="news--in--pictures" src={`/api/v2/files/getFile/${convertImage(element.header_media[0], 'small')}`} alt="bg" />
                          </Link>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ) : null
      );
    }
}
