/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
import React from "react";

export default function index({
  optionsData,
  onClick,
  onChange,
  name,
  massage,
  email
}) {
  return (
    <section className="section-wrap-lg contact" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-40">
            <h5 className="uppercase">Information</h5>

            {optionsData && optionsData.address ? (
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon icon_house_alt" />
                </div>
                <p>{optionsData.address}</p>
              </div>
            ) : null}
            {optionsData && optionsData.mobile ? (
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon icon_mobile" />
                </div>
                <span>{optionsData.mobile}</span>
              </div>
            ) : null}
            {optionsData && optionsData.email ? (
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="icon icon_mail_alt" />
                </div>
                <span>{optionsData.email}</span>
              </div>
            ) : null}
          </div>

          <div className="col-md-8">
            <form onSubmit={onClick}>
              <div className="row row-16">
                <div className="col-md-6 contact-name">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name*"
                    onChange={onChange}
                    value={name}
                    required
                  />
                </div>
                <div className="col-md-6 contact-email">
                  <input
                    name="email"
                    id="mail"
                    type="email"
                    placeholder="E-mail*"
                    onChange={onChange}
                    value={email}
                    required
                  />
                </div>
              </div>

              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows="9"
                onChange={onChange}
                value={massage}
                required
              />
              <input
                type="submit"
                className="btn btn-lg btn-color btn-submit"
                value="Send Message"
              />
              <div id="msg" className="message" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
