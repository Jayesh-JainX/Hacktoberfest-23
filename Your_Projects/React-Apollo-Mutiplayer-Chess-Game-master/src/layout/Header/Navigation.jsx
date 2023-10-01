import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

export default class Navigation extends Component {
  render() {
    return (
      <nav className={styles.Nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              exact
              activeClassName={styles['Menu__Item--Active']}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/game-history"
              activeClassName={styles['Menu__Item--Active']}
            >
              Game History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rankings"
              activeClassName={styles['Menu__Item--Active']}
            >
              Rankings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeClassName={styles['Menu__Item--Active']}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
