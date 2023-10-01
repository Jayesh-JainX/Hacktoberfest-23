import React, { Component } from 'react';

import LayoutContext from '../../layout/LayoutContext';
import FormControl from '../UI/FormControl/FormControl';

import styles from './LoginForm.module.scss';

class LoginForm extends Component {
  state = {
    form: {
      username: {
        val: '',
        valid: false,
        touched: false
      },
      password: {
        val: '',
        valid: false,
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    this.setFormControlValue = this.setFormControlValue.bind(this);
    this.markFormControlAsTouched = this.markFormControlAsTouched.bind(this);
  }

  setFormControlValue(event, name) {
    const { form } = this.state;
    const { value } = event.target;

    form[name].val = value;
    form[name].valid = this.validateFormControlValue(name, value);

    this.setState({
      form
    });
  }

  markFormControlAsTouched(name) {
    const { form } = this.state;

    form[name].touched = true;

    this.setState({
      form
    });
  }

  validateFormControlValue(name, value) {
    if (name === 'username' && value.length === 0) {
      return false;
    }

    if (name === 'password' && (value.length < 7 || value.length > 42)) {
      return false;
    }

    return true;
  }

  render() {
    const { username, password } = this.state.form;
    const { onSubmit, error } = this.props;

    return (
      <form
        className={styles.LoginForm}
        onSubmit={e => {
          e.preventDefault();
          onSubmit(username.val, password.val);
        }}
      >
        <h2 className="c--secondary">Login</h2>

        {error && <p className="message--error">{error.message}</p>}

        <FormControl
          type="text"
          placeholder="Username or email"
          value={username.val}
          onChange={e => this.setFormControlValue(e, 'username')}
          onBlur={() => this.markFormControlAsTouched('username')}
          invalid={username.touched && !username.valid}
        />

        <FormControl
          type="password"
          placeholder="Password"
          value={password.val}
          onChange={e => this.setFormControlValue(e, 'password')}
          onBlur={() => this.markFormControlAsTouched('password')}
          invalid={password.touched && !password.valid}
        />

        <button
          disabled={!username.valid || !password.valid}
          type="submit"
          className="btn btn--block btn--secondary btn--xl"
        >
          Login
        </button>
      </form>
    );
  }
}

LoginForm.contextType = LayoutContext;

export default LoginForm;
