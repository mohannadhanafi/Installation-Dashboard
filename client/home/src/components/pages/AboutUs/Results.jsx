/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

export default function WhatWeDo({ statistics }) {
  console.log(statistics);

  return (
    <section className="section-wrap results parallax-counters relative pt-mdm-40">
      <div className="container">
        <div className="row">
          {statistics && statistics.slice(0, 6).map(element => (
            <div className="col-md-2 col-sm-4 text-center">
              <div className="statistic mt-mdm-40">
                <span className="timer" data-from="0" data-to={element.count}>
                &nbsp;
                </span>
                <h5 className="counter-text">{element.title}</h5>
              </div>
            </div>
          )) }


        </div>
      </div>
      <div className="parallax" data-stellar-background-ratio="0.5" />
    </section>
  );
}
