/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function index({ AllComments }) {
  return (
    <div className="entry-comments mt-20">
      <h3 className="heading relative heading-small uppercase bottom-line style-2 left-align mb-40">
        {`${AllComments.length} `}comments
      </h3>
      <ul className="comment-list">
      {AllComments.map(comment => (
        <li>
          <div className="comment-body">
            <img src="https://cdn2.iconfinder.com/data/icons/finances/512/client-512.png" className="comment-avatar" alt="bg" />
            <div className="comment-content">
              <span className="comment-author">{comment.email}</span>
              <span><Link to="/">{moment(comment.time).calendar()}</Link></span>
              <p>{comment.username}</p>
            </div>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}
