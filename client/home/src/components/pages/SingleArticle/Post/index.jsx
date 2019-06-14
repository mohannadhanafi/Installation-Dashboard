/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PostDetails from './PostDetails';
import PostBody from './PostBody';
import Tags from './Tags';
import Social from './Social';
import Auther from './Auther';
import NextPrev from './NextPrev';

export default function index({
  images, author, tags, date, category, comments, title, body, next, prev,
}) {
  return (
    <div className="entry-item">
      <PostDetails
        images={images}
        date={date}
        category={category}
        comments={comments}
        author={author}
        title={title}
      />
      <div className="entry">
        <div className="entry-content">
          <PostBody body={body} />
          {tags.length ? <Tags tags={tags} /> : null}
          <div className="entry-share">
            <div className="socials-share clearfix">
              <span className="uppercase">Share:</span>
              <Social />
            </div>
          </div>
          <Auther author={author} />
          <NextPrev
            next={next}
            prev={prev}
          />
        </div>
      </div>
    </div>
  );
}
