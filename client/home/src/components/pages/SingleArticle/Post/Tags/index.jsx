import React from 'react';

export default function index({ tags }) {  
  return (
    <div className="entry-tags tags mb-30 mt-40 clearfix">
      <span className="uppercase left">Tags : </span>
      {tags.length ? tags.map(tag => (
        <a href="#">{tag}</a>
      )) : null}
    </div>
  );
}
