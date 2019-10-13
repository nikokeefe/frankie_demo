import React from 'react';
import { Link } from 'gatsby';
import { window } from 'browser-monads';

import logo from '../../images/frankie_logo.svg';

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
            window.location.href.indexOf('contact') > 0
              ? 'nav__item--link active'
              : 'nav__item--link'
          }
          to="/contact"
        >
          Contact
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
      </div>
    </nav>
  );
};
export default Nav;
