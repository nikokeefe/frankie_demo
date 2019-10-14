import React from 'react';
import { Link } from 'gatsby';
import { window } from 'browser-monads';

import logo from '../../images/compass-logo.svg';

import './nav.css';

const Nav = () => {
  return (
    <nav>
      <div className="nav__items">
        <a href="/" className="nav__item--left">
          <img
            src={logo}
            className="nav__item--logo"
            alt="frankie mcmillan logo"
          />
        </a>
        <Link
          className={
            window.location.href.indexOf('about') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="/contact"
        >
          About
        </Link>
        <Link
          className={
            window.location.href.indexOf('books') > 0 ||
            window.location.href.indexOf('category') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="/books"
        >
          Books
        </Link>

        <Link
          className={
            window.location.href.indexOf('reviews') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="/contact"
        >
          Reviews
        </Link>

        <Link
          className={
            window.location.href.indexOf('Buy') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="url(https://www.nationwidebooks.co.nz/author/frankie-mcmillan)"
        >
          Buy
        </Link>
        <Link
          className={
            window.location.href.indexOf('contact') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="/contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
