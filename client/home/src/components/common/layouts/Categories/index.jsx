import React, { Component } from 'react';
import axios from 'axios';
import Category1 from './Category1';

import './style.css';

export default class index extends Component {
    state = {
      title1: '', 
      news1: '',
      title2: '',
      news2: '',
      title3: '',
      news3: '',
    }

    componentDidMount() {
      const { cat1, cat3, cat2 } = this.props;

      axios(`/api/v2/categories/CatWithPosts/${cat1}`).then((result) => {
        const { data: { catName: title1, result: { rows } } } = result;
        this.setState(() => ({ title1, news1: rows }));
        axios(`/api/v2/categories/CatWithPosts/${cat2}`).then((result1) => {
          const { data: { catName: title2, result: { rows } } } = result1;
          this.setState(() => ({ title2, news2: rows }));
          axios(`/api/v2/categories/CatWithPosts/${cat3}`).then((result2) => {
            const { data: { catName: title3, result: { rows } } } = result2;
            this.setState(() => ({ title3, news3: rows }));
          });
        });
      });
    }

    render() {
      const {
        title1, title2, title3, news1, news2, news3,
      } = this.state;
      return (
        <section className="section-wrap relative pb-0 pt-0 categories">
          <div className="row">
            <Category1
              title={title1}
              news={news1}
            />
            <Category1
              title={title2}
              news={news2}
            />
            <Category1
              title={title3}
              news={news3}
            />
          </div>
        </section>
      );
    }
}
