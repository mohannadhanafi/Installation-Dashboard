import React from 'react';

export default function index({
  onClick, comment, name, email, onChange,
}) {
  return (
    <div className="comment-form mt-60 mb-50">
      <h3 className="heading relative heading-small uppercase bottom-line style-2 left-align">leave a reply</h3>
      <form onSubmit={onClick}>
        <div className="row row-16">
          <div className="col-md-6">
            <input name="name" type="text" placeholder="Name*" value={name} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <input name="email" type="email" placeholder="E-mail*" value={email} onChange={onChange} required />
          </div>
          <div className="col-md-12">
            <textarea name="comment" placeholder="Comment" rows="8" value={comment} onChange={onChange} required />
          </div>
        </div>
        <input type="submit" className="btn btn-md btn-color" value="Post Comment" />
      </form>
    </div>
  );
}
