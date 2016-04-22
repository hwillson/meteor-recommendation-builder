import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }

    this.setState({ errors });
    if (!Object.keys(errors).length) {
      Meteor.loginWithPassword(email, password, err => {
        if (err) {
          this.setState({
            errors: { none: err.reason },
          });
        }
      });
    }
  }

  renderErrors() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    let content = '';
    if (errorMessages.length) {
      content = (
        <Alert bsStyle="danger">
          {errorMessages.map(msg => (
            <div key={msg}>{msg}</div>
          ))}
        </Alert>
      );
    }
    return content;
  }

  render() {
    return (
      <div className="admin-login">
        <h1>Login</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          {this.renderErrors()}
          <FormGroup>
            <ControlLabel>
              Email
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="Your email address"
              ref="email"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Password
            </ControlLabel>
            <FormControl
              type="password"
              placeholder="Your password"
              ref="password"
            />
          </FormGroup>
          <Button type="submit" bsStyle="primary">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
