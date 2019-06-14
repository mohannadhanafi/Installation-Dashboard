import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Category extends Component {
  state = {
    categories: [],

  };

  componentWillMount() {
    axios.get('/api/v2/categories/allWithCount').then((result) => {
      const { data } = result;
      this.setState(() => ({ categories: data }));
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="widget categories">
        <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">


          Categories
        </h3>
        <ul className="list-dividers">
          {categories.length
            ? categories.slice(0, 10).map(({ name, seo }) => (
              <li>
                <Link to={`/news/${seo}`}>
                  {name}
                </Link>
              </li>
            )) : null}
        </ul>
      </div>
    );
  }
}
