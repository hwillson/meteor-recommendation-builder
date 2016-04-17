import React from 'react';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  render() {
    return (
      <div className="admin-login-page">
        <div className="row">
          <div className="col-md-4">
            <h1>Login</h1>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <button type="submit" className="btn btn-default">Go</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default LoginPage;
