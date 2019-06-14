/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { connect } from 'react-redux/es';
import { convertImage } from '../../../appRedux/actions';

class Footer extends Component {
  state = {
    categories: [],
    email: '',
    options: [],

    links: [{ name: 'facebook', link: '#' }, { name: 'google-plus', link: '#' }, { name: 'youtube', link: '#' }, { name: 'linkedin', link: '#' }, { name: 'vimeo', link: '#' }],
    copyrights: '© 2015 Afela Theme | Made by DeoThemes',
    recentPosts: [
    ],
  };

  componentWillMount() {
    axios.get('/api/v2/categories/allWithCount').then((result) => {
      const { data } = result;
      this.setState(() => ({ categories: data }));
    });
  }


  addNewletter= async (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    const { email } = this.state;
    const data = { email };
    await axios.post('api/v2/newsletters', data).then((res) => {
      const { data: { message } } = res;
      if (res.err) {
        return Toast.fire({
          type: 'error',
          title: message,

        });
      }
      Toast.fire({
        type: 'success',
        title: message,
      });
      this.setState({
        email: '',
      });
    }).catch((err) => {
      Toast.fire({
        title: 'Somthing Error',
        type: 'error',
      });
    });
  }

  onChange=(e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      aboutUs, categories, links, email,
    } = this.state;

    const { optionsData: options, recentData: recentPosts } = this.props;

    return (
      <footer className="footer footer-type-4">
      <div className="hidden">
            {options.length && options[0].footer}
          </div>
        <div className="container">
          <div className="footer-widgets">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="widget footer-about-us">
                  <h5 className="uppercase">About Us</h5>
                  <p className="mb-20">
                    {aboutUs}
                  </p>

                  <p>Subscribe to our newsletter:</p>
                  <form className="relative newsletter-form style-2" onSubmit={this.addNewletter}>
                    <input
                      type="email"
                      className="newsletter-input"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      required
                    />
                    <i className="icon_mail" />
                    <input
                      type="submit"
                      className="btn btn-md btn-dark newsletter-submit"
                      value="Subscribe"
                    />
                  </form>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="widget footer-posts with-thumbs">
                  <h5 className="uppercase">Recent Posts</h5>
                  <div className="footer-entry-list">
                    <ul className="posts-list no-top-pad">
                      {recentPosts.length ? recentPosts.slice(0, 2).map(post => (
                        <li className="footer-entry">
                          <article className="post-small clearfix">
                            <div className="col-md-6 col-sm-6 col-xs-5">

                              <div className="entry-img hover-scale">
                                <a href={`/news/${post.seo}`}>
                                  <img src={`/api/v2/files/getFile/${convertImage(post.header_media[0], 'small')}`} alt="" />
                                </a>
                              </div>
                            </div>

                            <div className="entry">
                              <h3 className="entry-title two-lines">
                                <a href={`/news/${post.seo}`}>
                                  {post.title}
                                </a>
                              </h3>
                              <ul className="entry-meta list-inline">
                                <li className="entry-date">
                                  <a href={`/news/${post.seo}`}>{moment(post.createdAt).calendar()}</a>
                                </li>
                              </ul>
                            </div>
                          </article>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="widget footer-links small-space">
                  <h5 className="uppercase">Useful Links</h5>
                  <ul>
                    {categories.length ? categories.slice(0.5).map(category => (
                      <li><a href="#">{category.name}</a></li>
                    )) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-xs-12 copyright">
                <span>

                  {options.length ? <a href="/">{options[0].copyrights}</a>
                    : null}
                </span>
              </div>

              <div className="col-md-5 col-xs-12">
                <ul className="bottom-footer-links style-2">
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Use</a>
                  </li>
                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Advertisement</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-3 col-xs-12 footer-socials mt-mdm-10 text-right">
                <div className="social-icons dark">
                  {options.length ? (
                  <>
                    {options[0].facebook ? (
                        <a
                          href={options[0].facebook}
                        >
                          <i className={`fab fa-facebook`} />
                        </a>
                    ) : null}
                    {options[0].twitter ? (
                        <a
                          href={options[0].twitter}
                        >
                          <i className={`fab fa-twitter`} />
                        </a>
                    ) : null}
                    {options[0].youtube ? (
                        <a
                          href={options[0].youtube}
                        >
                          <i className={`fab fa-youtube`} />
                        </a>
                    ) : null}
                    {options[0].google ? (
                        <a
                          href={options[0].google}
                        >
                          <i className={`fab fa-google`} />
                        </a>
                    ) : null}
                    {options[0].whats ? (
                        <a
                          href={`tel:${options[0].whats}`}
                        >
                          <i className={`fab fa-whatsapp`} />
                        </a>
                    ) : null}
                        {options[0].instagram ? (
                        <a
                          href={ options[0].instagram }
                        >
                          <i className={`fab fa-instagram`} />
                        </a>
                        ) : null}
                        {options[0].linkedin ? (
                        <a
                          href={options[0].linkedin}
                        >
                          <i className={`fab fa-linkedin`} />
                        </a>
                        ) : null}
                  </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = ({ options, recent }) => {
  const { options: optionsData } = options;
  const { recent: recentData } = recent;
  return {
    optionsData, recentData,
  };
};

export default connect(mapStateToProps, null)(Footer);
