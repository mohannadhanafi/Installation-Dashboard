/* eslint-disable camelcase */
import React from 'react';

export default function TopSection({ about_title }) {
  return (
    <section
      className="page-title style-3 text-center about-background"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
      }}
    >
      <div className="container relative clearfix">
        <div className="title-holder">
          <div className="title-text">
            <h1 className="uppercase">{about_title}</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>

              <li className="active">{about_title}</li>
            </ol>
          </div>
        </div>
        <div className="local-scroll hidden-sm hidden-xs">
          <a href="#intro" className="scroll-down">
            <i className="fa fa-angle-down" />
          </a>
        </div>
      </div>
    </section>
  );
}
