/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

export default function Testomonials({ testomonials }) {
  return (
    <section className="section-wrap parallax-testimonials nopadding relative">
      <div className="relative test-back">
        <h2 className="text-center uppercase color-white">Happy Customers</h2>
        <div
          id="owl-testimonials"
          className="owl-carousel owl-theme text-center"
        >
          {testomonials && testomonials.slice(0, 3).map(item => (
            <div className="item">
              <div className="container testimonial">
                <div className="row">
                  <div className="col-md-12">
                    <p className="testimonial-text">{item.description}</p>
                    <span>
                      {item.name}, {item.jobTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="parallax" data-stellar-background-ratio="0.5" />
    </section>
  );
}
