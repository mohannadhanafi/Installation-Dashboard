import React from 'react';
import { connect } from 'react-redux';
import getOptions from '../../../appRedux/actions/options';
import './style.css';

function index({ options }) {
  return (
    <div className="layout-minimal main--div" style={{ background: 'url(https://i.ibb.co/BPnN55B/image-13.jpg) no-repeat' }}>
      <div className="global-overlay shadow-9">
        <div className="overlay-inner bg-white opacity-70" />
        <div className="frame">
          <div className="frame-inner frame-inner-a bg-primary" />
          <div className="frame-inner frame-inner-b bg-primary" />
        </div>
      </div>
      <div className="container">

        <header className="site-header">
          {options && (
          <a href="/" className="logo mx-auto">
            <img className="logo" src={`/api/v2/files/getFile/${options[0].logo}`} alt="logo" />
          </a>
          )}
        </header>

        <div className="home-block">
          <div className="home-block-inner">

            <div id="home" className="d-flex min-vh--100 section">
              <div className="container align-self-center">
                <h1 className="mb-3 h1">We bulid beautiful digital experiences.</h1>
                <p className="lead mb-5 p">Our website is under construction. We`ll be here soon with our new awesome site</p>
                <div className="row">
                  <div className="col-12 col-md-8 col-lg-7" />
                </div>
              </div>
            </div>
            {options && (

            <nav className="usefull-nav usefull-nav-pinned d-none d-xl-flex">
              <ul>
                <li><a className="icon--link" href={options[0].facebook}><i className="ui-facebook" /></a></li>
                <li><a className="icon--link" href={options[0].twitter}><i className="ui-twitter" /></a></li>
                <li><a className="icon--link" href={options[0].instagram}><i className="ui-instagram" /></a></li>
              </ul>
            </nav>
            )}

          </div>
        </div>
      </div>
      {/* </> */}

    </div>
  );
}

const mapStateToProps = ({ options }) => options;
export default connect(mapStateToProps, { getOptions })(index);
