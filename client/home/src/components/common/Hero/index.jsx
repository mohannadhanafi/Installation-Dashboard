
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './style.css';

export default class Hero extends Component {
  state = {
    hero: [],
  };

  componentDidMount() {
    axios('/api/v2/heading').then((result) => {
      const { data } = result;
      this.setState({ hero: data });
    });
  }

  render() {
    const { hero } = this.state;
    return (
      hero.length ? (
        <div className="main-wrapper magazine oh">
          <div className="container">
            <section className="section-wrap main-news pt-30">
              <div className="row small-spacing">
                <div className="col-md-7 ">
                  <article className="post-1">
                    <div className="entry-img hover-scale">
                      <img className="hero1" src={`/api/v2/files/getFile/${hero[0].header_media[0]}`} alt="bg-slider" />
                      <div className="entry-inner">
                        <div className="entry">
                          <h2 className="entry-title color-white">
                            {hero[0].title}
                          </h2>
                          <ul className="entry-meta list-inline">
                            <li className="entry-date">
                              <i className="fa fa-clock-o" /><a>{moment(hero[0].createdAt).calendar()}</a>
                            </li>
                            <li className="entry-category">
                              <i className="fa fa-folder-open" /><a>{hero[0].category.name}</a>
                            </li>
                            <li className="entry-author">
                              <i className="fa fa-user" /><a>{hero[0].user.name}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-md-5 ">
                  {hero[1] ? (
                    <article className="post-2">
                      <div className="entry-img hover-scale">
                        <img className="hero2" src={`/api/v2/files/getFile/${hero[1].header_media[0]}`} alt="" />
                        <div className="entry-inner small">
                          <div className="entry">
                            <h2 className="entry-title color-white">
                              {hero[1].title}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </article>
                  ) : null}
                  {hero.length > 2 ? (
                    <div className="row small-spacing">
                      {hero.slice(2, 4).map(post => (
                        <div className="col-sm-6 post-3">
                          <article>
                            <div className="entry-img hover-scale">
                              <img className="hero3" src={`/api/v2/files/getFile/${post.header_media[0]}`} alt="bg" />
                              <div className="entry-inner small">
                                <div className="entry">
                                  <h2 className="entry-title color-white">
                                    {post.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null
    );
  }
}
