import React, { Component } from 'react';
import Bottom from './Bottom';

export default class Header extends Component {
  state = {};

  render() {
    const { options } = this.props;
    console.log(options)
    return (
      <>
        <div className="header-wrap">
          <div className="container">
            <div className="row">
              <div className="logo-container">
                <div className="logo-wrap text-center">
                {options.length ? (
                  <a href="/">
                    <img
                      className="logo"
                      src={`/api/v2/files/getFile/${options[0].logo}`}
                      alt="logo"
                    />
                  </a>
                ) : null}
                </div>
              </div>

              <div className="header-ad hidden-sm hidden-xs">
                <a href="http://deothemes.com">
                  <img src="http://deothemes.com/envato/afela/html/img/magazine/728_ad.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}
