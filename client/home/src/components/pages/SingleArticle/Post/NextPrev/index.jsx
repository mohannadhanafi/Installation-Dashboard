/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function index({ next, prev }) {
  return (
    <div className="entry-prev-next">
      <div className="row">
        <div className="col-sm-6 prev-entry">
          <span>
            <i className="fa fa-angle-left" />
            Previous Post
          </span>
          {prev.length ? (
          <h4>
            <Link to={`/news/${prev[0].cat_seo}/${prev[0].seo}`}>
              {prev[0].title || null}
            </Link>
          </h4>
          ) : (
            <h4 className="disable">
            This is the first one
          </h4>
          )}
        </div>
        <div className="col-sm-6 next-entry">
          <span>
            Next Post
            <i className="fa fa-angle-right" />
          </span>
          {next.length ? (
          <h4>
            <Link to={`/news/${next[0].cat_seo}/${prev[0].seo}`}>
              {next[0].title || null}
            </Link>
          </h4>
          ) : (
            <h4 className="disable">
            This is the first one
          </h4>
          )}
        </div>
      </div>
    </div>
  );
}
