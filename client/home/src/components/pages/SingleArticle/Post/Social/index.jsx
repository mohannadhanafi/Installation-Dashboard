import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <div className="social-icons colored">
      <Link
        to="/"
        className="social-twitter"
        data-toggle="tooltip"
        data-placement="top"
        title="Twitter"
      >
        <i className="fab fa-twitter" />
      </Link>
      <Link
        to="/"
        className="social-facebook"
        data-toggle="tooltip"
        data-placement="top"
        title="Facebook"
      >
        <i className="fab fa-facebook" />
      </Link>
      <Link
        to="/"
        className="social-google-plus"
        data-toggle="tooltip"
        data-placement="top"
        title="Google +"
      >
        <i className="fab fa-google-plus" />
      </Link>
      <Link
        to="/"
        className="social-pinterest"
        data-toggle="tooltip"
        data-placement="top"
        title="Pinterest"
      >
        <i className="fab fa-pinterest-p" />
      </Link>
      <Link
        to="/"
        className="social-instagram"
        data-toggle="tooltip"
        data-placement="top"
        title="Instagram"
      >
        <i className="fab fa-instagram" />
      </Link>
      <Link
        to="/"
        className="social-email"
        data-toggle="tooltip"
        data-placement="top"
        title="Email"
      >
        <i className="fa fa-envelope" />
      </Link>
    </div>
  );
}
