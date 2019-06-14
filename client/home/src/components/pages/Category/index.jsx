import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux/es';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

class index extends Component {
  state = {
    background:
      'http://deothemes.com/envato/afela/html/img/blog/blog_title_bg.jpg',
    posts: [],
  };


  componentDidMount() {
    this.getData(this.props);
  }

  closeLoading = () => {
    $(document).ready(() => {
      (function ($) {
        $('.loader')
          .delay(1000)
          .fadeOut();
        $('.loader-mask')
          .delay(1500)
          .fadeOut('slow');
        $(window).trigger('resize');
      }(window.jQuery));
    });
  }

  componentWillReceiveProps(props) {
    this.getData(props);
  }

runLoading = () => {
  $(document).ready(() => {
    (function ($) {
      $('.loader').show();
      $('.loader-mask').show();
    }(window.jQuery));
  });
}

  getData = (props) => {
    const { options } = props;

    if (options.length) {
      const { category_post_no } = options[0];
      this.runLoading();
      this.closeLoading();
      window.scrollTo(0, 0);

      const {
        history: {
          location: { pathname }, 
        },
      } = props;
      const seo = pathname.split('/')[2];
      axios
        .get(`/api/v2/categories/CatWithPosts/${seo}`, {
          params: {
            limit: category_post_no,
            offset: 0,
          },
        })
        .then((results) => {
          const { data } = results;
          const { result, catName } = data;
          const { rows, count } = result;
          this.setState({ posts: rows, catName, total: count });
        })
        .catch((error) => {});
    }
  };


  changeData = (current) => {
    const { history: { location: { pathname } }, options } = this.props;
    this.runLoading();
    this.closeLoading();
    const { category_post_no } = options[0];

    const seo = pathname.split('/')[2];
    axios(
      `/api/v2/categories/CatWithPosts/${seo}`, {
        params: {
          limit: category_post_no,
          offset: current - 1,
        },
      },
    ).then((result) => {
      const {
        data: {
          result: { rows },
        },
      } = result;

      this.setState(() => ({ posts: rows }), () => window.scrollTo(0, 0));
    });
  };


  render() {
    const { background, posts, total } = this.state;
    const { options } = this.props;

    return (
      <>
        <div className="loader-mask">
          <div className="loader">Loading...</div>
        </div>
        <TopSection background={background} posts={posts} />
        {options.length ? <BottomSection posts={posts} changeData={current => this.changeData(current)} total={total} catNo={options[0].category_post_no} />
          : null}
      </>
    );
  }
}
const mapStateToProps = ({ options }) => options;

export default connect(mapStateToProps, null)(withRouter(index));
