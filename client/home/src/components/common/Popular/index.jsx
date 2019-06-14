import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { connect } from 'react-redux/es';
import moment from 'moment';

class Popular extends Component {
  state = {

  };

  render() {
    const { recentData: recentPosts, Trending: Popular } = this.props;
    return (
      <div className="widget popular-latest">
        <div className="tabs">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#popular-news" data-toggle="tab">Popular</a>
            </li>
            <li>
              <a href="#recent-news" data-toggle="tab">Recent</a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade in active" id="popular-news">
              <ul className="posts-list no-top-pad">
                {Popular.length && Popular.slice(0, 3).map(element => (
                  <li>
                    <article className="post-small clearfix">
                      <div className="col-sm-4 nopadding">
                        <div className="entry-img hover-scale">
                          <a href={`/news/${element.category.seo}/${element.seo}`}>

                            <img
                              src={`/api/v2/files/getFile/${element.header_media[0]}`}
                              alt=""
                              className="popular__image"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="entry">
                          <h3 className="entry-title"><a href={`/news/${element.category.seo}/${element.seo}`}>{element.title}</a></h3>
                          <ul className="entry-meta list-inline">
                            <li className="entry-date">
                              <a href={`/news/${element.category.seo}/${element.seo}`}>{moment(element.createdAt).calendar()}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-pane fade" id="recent-news">
              <ul className="posts-list no-top-pad">
                {recentPosts.length ? recentPosts.slice(0, 3).map(element => (
                  <li>
                    <article className="post-small clearfix">
                      <div className="col-sm-4 nopadding">

                        <div className="entry-img hover-scale">

                          <a href={`/news/${element.category.seo}/${element.seo}`}>
                            <img
                              src={`/api/v2/files/getFile/${element.header_media[0]}`}
                              alt=""
                              className="popular__image"
                            />
                          </a>

                        </div>
                      </div>
                      <div className="col-sm-8">

                        <div className="entry">
                          <h3 className="entry-title"><a href={`/news/${element.category.seo}/${element.seo}`}>{element.title}</a></h3>
                          <ul className="entry-meta list-inline">
                            <li className="entry-date">
                              <a href={`/news/${element.category.seo}/${element.seo}`}>{moment(element.createdAt).calendar()}</a>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recent, trending }) => {
  const { trendingPosts: { Trending } } = trending;
  const { recent: recentData } = recent;
  return {
    recentData,
    Trending,
  };
};

export default connect(mapStateToProps, null)(Popular);
