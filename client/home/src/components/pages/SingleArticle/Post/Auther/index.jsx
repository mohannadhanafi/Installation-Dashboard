/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React from 'react';
import './style.css';

export default function index({ author }) {
  return (
    <div className="entry-author-box clearfix">
      <img className="avatar--single--post author-img" src={`/api/v2/files/getFile/${author.pic}`} alt="img" />
      <div className="author-info">
        <h6 className="author-name uppercase">by{` ${author.name}`}
        </h6>
        <p className="mb-0">{author.bio}</p>
      </div>
    </div>
  );
}
