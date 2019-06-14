import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  state = {
    links: [
      { name: 'facebook' },
      { name: 'google-plus' },
      { name: 'youtube' },
      { name: 'linkedin' },
      { name: 'vimeo' },
    ],
  };

  render() {
    const { links } = this.state;
    const { options } = this.props;
    return (
      <>
        <div className="top-bar hidden-xs">
          <div className="container">
            <div className="row">
              <div className="top-bar-links">
                <ul className="col-sm-6">
                  <li className="top-bar-date">
                    <span>{moment().format('dddd, MMMM D, YYYY')}</span>
                  </li>
                  <li className="top-bar-link">
                    <Link to="/contact">ADVERTISE</Link>
                  </li>
                </ul>

                <ul className="col-sm-6 top-bar-acc text-right">
                  {options.length ? (
                    <li className="social-icons dark">
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
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
