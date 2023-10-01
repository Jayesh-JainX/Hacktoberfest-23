import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';
import LayoutContext from '../LayoutContext';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <Link className={styles.Header__Title} to="/">
              React Chess
            </Link>
          </div>
          <div className="col">
            <Navigation />
          </div>
          <div className="col-auto">
            <LayoutContext.Consumer>
              {({ authenticated }) => (
                <>
                  {!authenticated && (
                    <>
                      <Link to="/login" className="btn btn--white">
                        Login
                      </Link>
                      <Link to="/signup" className="btn btn--white">
                        Sign up
                      </Link>
                    </>
                  )}
                  {authenticated && (
                    <Link to="/logout" className="btn btn--white">
                      Logout
                    </Link>
                  )}
                </>
              )}
            </LayoutContext.Consumer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
