import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux/es';

class Tags extends Component {
  state={

  }


  render() {
    const { trendingPosts: { Trending } } = this.props;
    console.log(Trending.tags);

    return (
      Trending.length ? (
        <div className="widget tags clearfix">

          <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">Tags</h3>
          {Trending && Trending.map(element => (
            element.tags.length ? (element.tags.slice(0, 4).map(tag => (
              <Link to={`/news/${element.category.seo}/${element.seo}`}>
                {tag}
              </Link>
            ))) : null


          )) }
        </div>
      ) : null
    );
  }
}

const mapStateToProps = ({ trending }) => trending;

export default connect(mapStateToProps, null)((Tags));
