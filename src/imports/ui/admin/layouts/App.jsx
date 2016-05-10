import { Meteor } from 'meteor/meteor';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';

import Login from '/imports/ui/admin/components/auth/Login.jsx';

const logout = (event) => {
  event.preventDefault();
  Meteor.logout();
};

const renderAdmin = (children) => (
  <div className="admin">
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Box Builder Admin</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to={{ pathname: '/admin/recommended-products' }}>
            <NavItem className="active">Recommended Products</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/admin/settings' }}>
            <NavItem>Settings</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavItem className="logout" href="#" onClick={logout}>
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Grid id="admin-content">
      {children}
    </Grid>
  </div>
);

const App = (props) => {
  let content;
  if (props.user) {
    content = renderAdmin(props.children);
  } else {
    content = <Login />;
  }
  return content;
};

App.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.element,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
