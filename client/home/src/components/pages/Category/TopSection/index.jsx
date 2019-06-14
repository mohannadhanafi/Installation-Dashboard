import React from 'react';
import { Link } from 'react-router-dom';

export default function index({ background, posts }) {
  return (

    <section className="page-title text-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="container relative clearfix">
        <div className="title-holder">
          <div className="title-text">
            <h1 className="uppercase">{posts[0] ? (posts[0].category.category_name) : null}</h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={posts[0] ? (`/news/${posts[0].category.category_seo}`) : null}>{posts[0] ? posts[0].category.category_name: null}</Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
