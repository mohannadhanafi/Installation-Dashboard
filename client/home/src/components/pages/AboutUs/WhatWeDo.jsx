/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React from 'react';

export default function WhatWeDo({ about_desc }) {
  return (
    <section className="section-wrap" id="intro">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="about-description">
              <h4>What We Do</h4>
              <p>
                {about_desc}
              </p>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="progress-bars skills-progress">
              <h6>

                Web Design
                {' '}
                <span>88%</span>
              </h6>
              <div className="progress meter">
                <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow="88"
                  className="progress-bar"
                  role="progressbar"
                >
                  <span className="sr-only">88% Complete</span>
                </div>
              </div>

              <h6>

                Marketing
                {' '}
                <span>92%</span>
              </h6>
              <div className="progress meter">
                <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow="92"
                  className="progress-bar"
                  role="progressbar"
                >
                  <span className="sr-only">92% Complete</span>
                </div>
              </div>

              <h6>

                WordPress
                {' '}
                <span>94%</span>
              </h6>
              <div className="progress meter">
                <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow="94"
                  className="progress-bar"
                  role="progressbar"
                >
                  <span className="sr-only">94% Complete</span>
                </div>
              </div>

              <h6>

                Photography
                {' '}
                <span>78%</span>
              </h6>
              <div className="progress meter" id="animated-skills">
                <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow="78"
                  className="progress-bar"
                  role="progressbar"
                >
                  <span className="sr-only">78% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
