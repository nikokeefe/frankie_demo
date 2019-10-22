import React from 'react';
import { Link } from 'gatsby';
import { window } from 'browser-monads';

// import logo from '../../images/compass-logo.svg';

import './nav.css';

const Nav = () => {
  return (
    <nav>
      <div className="nav__items">
        <a href="/" className="nav__item--left nav__item--logo">
          <p>
            <span>frankie</span>
          </p>
          <p>
            <span>macmillan</span>
          </p>
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

        <a
          className={
            window.location.href.indexOf('Buy') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          href="https://www.nationwidebooks.co.nz/author/frankie-mcmillan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy
        </a>
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
