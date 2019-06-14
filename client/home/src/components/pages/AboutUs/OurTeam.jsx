/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

export default function OurTeam({ teamTitle, team }) {
  return (      
    <section className="section-wrap-lg our-team pb-80">
      <div className="container">
        <div className="row heading">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h2 className="bottom-line">Our Team</h2>
            <p className="subheading style-2">
              {teamTitle}
            </p>
          </div>
        </div>

        <div className="row">
          {team && team.slice(0, 3).map(element => (
            <div
              className="col-md-4 col-sm-6 team-wrap mb-40 wow fadeInUp"
              data-wow-duration="1.2s"
              data-wow-delay=".1s"
            >
              <div className="team-member text-center">
                <div className="team-img" onClick="return true">
                  <img src={`/api/v2/files/getFile/${element.image}`} alt="" />
                  <div className="overlay">
                    <div className="team-details text-center">
                      <div className="social-icons rounded">
                        <a href={element.facebook}>
                          <i className="fab fa-facebook" />
                        </a>
                        <a href={element.twitter}>
                          <i className="fab fa-twitter" />
                        </a>
                        <a href={element.google}>
                          <i className="fab fa-google-plus" />
                        </a>
                        <a href={element.instagram}>
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="team-title">{element.name}</h4>
                <span>{element.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
