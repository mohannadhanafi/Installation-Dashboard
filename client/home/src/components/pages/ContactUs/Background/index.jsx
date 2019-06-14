import React from 'react';
import { Link } from 'react-router-dom';

export default function index({ background }) {
  return (
    <section className="page-title text-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="container relative clearfix">
        <div className="title-holder">
          <div className="title-text">
            <h1 className="uppercase">Contact</h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">Contact</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
