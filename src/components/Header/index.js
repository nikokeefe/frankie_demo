import React from 'react';
import { navigate } from 'gatsby';

import './header.css';

const Header = () => {
  return (
    <header>
      <div className="header__section">
        <div className="header__content">
          <div className="header__info">
            <h1 className="header__title">frankie mcmillan</h1>
            <p className="header__subtitle">good at writing and stuff...</p>
            <button onClick={() => navigate(`/`)} className="btn__med">
              Read More
            </button>
          </div>
          <div className="header__img"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
