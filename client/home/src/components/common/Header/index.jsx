import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux/es';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class Header extends Component {
    state = { data: '' }

    render() {
      const { options } = this.props;
      return (
        <header className="nav-type-4">
          <div className="hidden">
            {options.length && options[0].header}
          </div>
          {options.length && <Top options={options} /> }
          <nav className="navbar navbar-static-top">
            <div className="navigation">
              <div className="container-fluid relative">
                <div className="row">
                  <div className="navbar-header container">
                    <div className="row">
                      <button
                        type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#navbar-collapse"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                  </div>
                  <Middle options={options} />
                  <Bottom />

                </div>
              </div>
            </div>
          </nav>
        </header>
      );
    }
}
const mapStateToProps = ({ options }) => options;

export default connect(mapStateToProps, null)(withRouter(Header));
