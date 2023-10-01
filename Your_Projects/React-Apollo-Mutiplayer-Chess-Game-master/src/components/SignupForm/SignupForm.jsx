import React, { Component } from 'react';

import FormControl from '../UI/FormControl/FormControl';

import styles from './SignupForm.module.scss';

class SignupForm extends Component {
  state = {
    form: {
      username: { val: '', valid: false, touched: false },
      email: { val: '', valid: false, touched: false },
      firstName: { val: '', valid: true, touched: false },
      lastName: { val: '', valid: true, touched: false },
      password: { val: '', valid: false, touched: false },
      repeatPassword: { val: '', valid: false, touched: false }
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
    if (name === 'username' && value.length < 6) {
      return false;
    }

    if (name === 'password' && (value.length < 7 || value.length > 42)) {
      return false;
    }

    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === 'email' && !regex.test(value.toLowerCase())) {
      return false;
    }

    const { password } = this.state.form;
    if (name === 'repeatPassword' && password.val !== value) {
      return false;
    }

    return true;
  }

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      repeatPassword
    } = this.state.form;
    const { onSubmit, error } = this.props;

    return (
      <form
        className={styles.SignupForm}
        onSubmit={e => {
          e.preventDefault();
          onSubmit(
            username.val,
            password.val,
            email.val,
            firstName.val,
            lastName.val
          );
        }}
      >
        <h2 className="c--secondary">Signup</h2>

        {error && <p className="message--error">{error.message}</p>}

        <div className="row row--form">
          <div className="col-sm">
            <FormControl
              type="text"
              placeholder="First name"
              value={firstName.val}
              onChange={e => this.setFormControlValue(e, 'firstName')}
              onBlur={() => this.markFormControlAsTouched('firstName')}
              invalid={firstName.touched && !firstName.valid}
            />
          </div>
          <div className="col-sm">
            <FormControl
              type="text"
              placeholder="Last name"
              value={lastName.val}
              onChange={e => this.setFormControlValue(e, 'lastName')}
              onBlur={() => this.markFormControlAsTouched('lastName')}
              invalid={lastName.touched && !lastName.valid}
            />
          </div>
        </div>
        <FormControl
          type="text"
          placeholder="Username"
          value={username.val}
          onChange={e => this.setFormControlValue(e, 'username')}
          onBlur={() => this.markFormControlAsTouched('username')}
          invalid={username.touched && !username.valid}
        />
        <FormControl
          type="email"
          placeholder="Email"
          value={email.val}
          onChange={e => this.setFormControlValue(e, 'email')}
          onBlur={() => this.markFormControlAsTouched('email')}
          invalid={email.touched && !email.valid}
        />
        <FormControl
          type="password"
          placeholder="Password"
          value={password.val}
          onChange={e => this.setFormControlValue(e, 'password')}
          onBlur={() => this.markFormControlAsTouched('password')}
          invalid={password.touched && !password.valid}
        />
        <FormControl
          type="password"
          placeholder="Repeat password"
          value={repeatPassword.val}
          onChange={e => this.setFormControlValue(e, 'repeatPassword')}
          onBlur={() => this.markFormControlAsTouched('repeatPassword')}
          invalid={repeatPassword.touched && !repeatPassword.valid}
        />

        <button type="submit" className="btn btn--block btn--secondary btn--xl">
          Signup
        </button>
      </form>
    );
  }
}

export default SignupForm;
