import React, { Component } from 'react';
import { connect } from 'react-redux/es';

class FollowUs extends Component {
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
    const { options: data } = this.props;
    return (
      <div className="widget follow-us">
        <h3 className="widget-title heading relative heading-small uppercase bottom-line style-2 left-align">

          Follow Us
        </h3>
        <div className="social-icons colored large">
          {data.length && (
            <>
            {data[0].facebook ? (
              <a
                href={data[0].facebook}
                className={`social-facebook`}
                data-toggle="tooltip"
                data-placement="top"
                title="Facebook"
              >
                <i className={`fab fa-facebook`} />
              </a>
            ) : null}
              {data[0].twitter ? (
              <a
                href={data[0].twitter}
                className={`social-twitter`}
                data-toggle="tooltip"
                data-placement="top"
                title="twitter"
              >
                <i className={`fab fa-twitter`} />
              </a>
            ) : null}
            {data[0].instagram ? (
              <a
                href={data[0].instagram}
                className={`social-instagram`}
                data-toggle="tooltip"
                data-placement="top"
                title="instagram"
              >
                <i className={`fab fa-instagram`} />
              </a>
            ) : null}
            {data[0].youtube ? (
              <a
                href={data[0].youtube}
                className={`social-youtube`}
                data-toggle="tooltip"
                data-placement="top"
                title="youtube"
              >
                <i className={`fab fa-youtube`} />
              </a>
            ) : null}
            {data[0].google ? (
              <a
                href={data[0].google}
                className={`social-google-plus`}
                data-toggle="tooltip"
                data-placement="top"
                title="google"
              >
                <i className={`fab fa-google-plus`} />
              </a>
            ) : null}
            {data[0].whats ? (
              <a
                href={data[0].whats}
                className={`social-whatsapp`}
                data-toggle="tooltip"
                data-placement="top"
                title="whatsapp"
              >
                <i className={`fab fa-whatsapp`} />
              </a>
            ) : null}
            {data[0].linkedin ? (
              <a
                href={data[0].linkedin}
                className={`social-linkedin`}
                data-toggle="tooltip"
                data-placement="top"
                title="linkedin"
              >
                <i className={`fab fa-linkedin`} />
              </a>
            ) : null}
              </>
            )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ options }) => options;

export default connect(mapStateToProps, null)(FollowUs);
