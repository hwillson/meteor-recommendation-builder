import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';

const App = (props) => (
  <div className="admin">
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Box Builder Admin</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to={{ pathname: '/admin/products' }}>
            <NavItem className="active">Products</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/admin/settings' }}>
            <NavItem>Settings</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Grid id="admin-content">
      {props.children}
    </Grid>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
