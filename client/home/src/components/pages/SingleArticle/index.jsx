/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
import FollowUs from '../../common/FollowUs';
import Popular from '../../common/Popular';
import Weather from '../../common/Weather';
import Ads from '../../common/Ads';
import Galleries from '../../common/Galleries';
import Categoty from '../../common/Category';
import TopRated from '../../common/TopRated';
import Tags from '../../common/Tags';
import PostBody from './Post';
import RelatedPosts from './RelatedPosts';
import Comments from './Comments';
import AddComment from './AddComment';

export default class SigleArtice extends Component {
  state = {
    images: [],
    date: '',
    category: {},
    tags: [],
    author: {},
    title: '',
    body: '',
    nextPost: {},
    prevPost: '',
    relatedPosts: [],
    AllComments: [
      {
        time: 'May 6, 2014 at 12:48 pm',
        comment: 'This template is so awesome. I didn’t expect so many features inside. E-commerce pages are very useful, you can launch your online store in few seconds. I will rate 5 stars.',
        user: {
          name: 'Joeby Ragpa',
          avatar: 'http://deothemes.com/envato/afela/html/img/blog/comment_1.jpg',
        },
      },
      {
        time: 'May 6, 2014 at 12:48 pm',
        comment: 'This template is so awesome. I didn’t expect so many features inside. E-commerce pages are very useful, you can launch your online store in few seconds. I will rate 5 stars.',
        user: {
          name: 'Christopher Robins',
          avatar: 'http://deothemes.com/envato/afela/html/img/blog/comment_3.jpg',
        },
      },
    ],
    name: '',
    email: '',
    comment: '',
  };


  addComment = async (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,

    });
    const {
      comment, name, email, id,
    } = this.state;
    const data = {
      comment,
      username: name,
      email,
      post_id: id,
    };
    await axios.post('/api/v2/comments/addComment', data).then(() => { 
      Toast.fire({
        title: 'Your comment sent, it will be avaliable after accept from admin',
        type: 'success',

      });
      this.setState({
        email: '', name: '', comment: '',
      });
    }).catch((err) => {
      Toast.fire({
        title: 'Somthing Error',
        type: 'error',
      });
    });
  };

getData = (props) => {
  const {
    match: {
      params: { seoName, category: cat_seo },
    },
  } = props;
  axios(`/api/v2/post/${cat_seo}/${seoName}`).then((result) => {
    const {
      data: {
        result: postData, nextPost, prevPost, commentsResult: AllComments,
      },
    } = result;

    const {
      header_media: images, tags, user: author, createdAt: date, category, title, description: body, id,
    } = postData[0];

    this.setState({
      images,
      tags,
      author,
      date,
      category,
      title,
      body,
      nextPost,
      prevPost,
      id,
      AllComments,
    });
  });
}

componentDidMount() {
  axios('/api/v2/post/lastposts').then((result) => {
    const { data } = result;
    this.setState({ relatedPosts: data });
  });
  window.scrollTo(0, 0);
  this.getData(this.props);
  $(document).ready(() => {
    (function ($) {
      $('.loader').delay(1000).fadeOut();
      $('.loader-mask').delay(1500).fadeOut('slow');
      $(window).trigger('resize');
    }(window.jQuery));
  });
}

componentWillReceiveProps(props) {
  $(document).ready(() => {
    (function ($) {
      $('.loader').show();
      $('.loader-mask').show();
      $(window).trigger('resize');
      $('.loader').delay(1000).fadeOut();
      $('.loader-mask').delay(1500).fadeOut('slow');
      $(window).trigger('resize');
    }(window.jQuery));
  });
  window.scrollTo(0, 0);
  this.getData(props);
}

onChange = ({ target: { name, value } }) => {
  this.setState({ [name]: value });
};

render() {
  const {
    images, tags, author, date, category, comments, title, body, relatedPosts, AllComments, nextPost, prevPost, comment, name, email,
  } = this.state;

  return (
    <div className="main-wrapper magazine oh">
      <div className="loader-mask">
        <div className="loader">Loading...</div>
      </div>
      <div className="container">
        <ol className="breadcrumb mt-20">
          <li>
            <a href="/">Home</a>
          </li>
          <li className="active">{title}</li>
        </ol>
      </div>

      <section className="section-wrap post-single pt-0 pb-50">
        <div className="container">
          <div className="row mt-40">
            <div className="col-md-8 content">
              <PostBody
                images={images}
                tags={tags}
                author={author}
                date={date}
                category={category}
                comments={comments}
                title={title}
                body={body}
                next={nextPost}
                prev={prevPost}
              />
              <RelatedPosts relatedPosts={relatedPosts} />
              <Comments AllComments={AllComments} />
              <AddComment
                onClick={this.addComment}
                comment={comment}
                name={name}
                email={email}
                onChange={this.onChange}
              />
            </div>
            <aside className="col-md-4 sidebar pb-50">
              <FollowUs />
              <Popular />
              <Weather />
              <Ads link="/" />
              <Galleries />
              <Categoty />
              <Tags />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
}
