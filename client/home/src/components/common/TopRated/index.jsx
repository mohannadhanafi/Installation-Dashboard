import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default class TopRated extends Component {
  state = {
    topRated: [],
  };

  componentDidMount() {
    axios('/api/v2/post/lastposts').then((result) => {
      const { data } = result;
      this.setState({ topRated: data });
    });
  }

  render() {
    const { topRated } = this.state;

    return topRated.length ? (
      <div className="widget top-rated">
        <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">



          top rated
</h3>
        <ul className="posts-list no-top-pad">
          {topRated.length
            && topRated.map(({
              title, link, date, header_media, category, seo,
            }) => (
              <li>
    <article className="post-small clearfix">
                  <div className="entry-img hover-scale">
                  <Link to={`/news/${category.seo}/${seo}`}>                      <img src={`/api/v2/files/getFile/${header_media[0]}`} alt="" className="image__top" />
                    </Link>
                  </div>
                  <div className="entry">
                    <h3 className="entry-title">
                    <Link to={`/news/${category.seo}/${seo}`}>{title}</Link>      
                    </h3>
                    <ul className="entry-meta list-inline">
                      <li className="rating" />

                    </ul>
                  </div>
                </article>
  </li>
            ))}
        </ul>
      </div>
    ) : null;
  }
}
