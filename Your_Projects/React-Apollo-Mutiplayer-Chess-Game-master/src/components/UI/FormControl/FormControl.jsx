import React from 'react';

import styles from './FormControl.module.scss';

const FormControl = ({ label, type, invalid, children, ...props }) => {
  let input = null;

  const classes = [];
  if (invalid === true) {
    classes.push(styles['FormControl--Invalid']);
  }

  switch (type) {
    case 'email':
    case 'text':
    case 'password':
      input = (
        <div className={[styles.Input, styles['Input--Text']].join(' ')}>
          <input type={type} {...props} />
        </div>
      );
      break;
    case 'textarea':
      input = (
        <div className={[styles.Input, styles['Input--Textarea']].join(' ')}>
          <textarea {...props} />
        </div>
      );
      break;
    case 'select':
      input = (
        <div className={[styles.Input, styles['Input--Select']].join(' ')}>
          <select {...props}>{children}</select>
        </div>
      );
      break;
    case 'checkbox':
      input = (
        <div className={[styles.Input, styles['Input--Checkbox']].join(' ')}>
          <input type="checkbox" {...props} />
          <span className={styles['Input__Icon']} />
        </div>
      );
      break;
    default:
      input = (
        <div className={[styles.Input, styles['Input--Text']].join(' ')}>
          <input type="text" {...props} />
        </div>
      );
      break;
  }

  return (
    <label className={[styles.FormControl, styles[type], ...classes].join(' ')}>
      {label && <span className={styles.Label}>{label}</span>}
      {input}
      {invalid && (
        <p className="message--error">{props.placeholder} is not valid</p>
      )}
    </label>
  );
};

export default FormControl;
