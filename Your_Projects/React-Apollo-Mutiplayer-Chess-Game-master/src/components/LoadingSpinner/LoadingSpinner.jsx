import React, { useState, useEffect } from 'react';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = ({ hidden, message, messageTimeout = 0 }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), messageTimeout);
    return () => {
      clearTimeout(messageTimer);
    };
  }, []);

  if (hidden !== true) {
    return (
      <div className={styles['Spinner__Container']}>
        <div className={styles['Spinner']}>
          <div />
          <div />
          <div />
        </div>
        {message && showMessage === true && (
          <p className={styles['Spinner__Message']}>{message}</p>
        )}
      </div>
    );
  }
  return null;
};

export default LoadingSpinner;
