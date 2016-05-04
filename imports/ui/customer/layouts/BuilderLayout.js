import React from 'react';
import { Navbar, Grid, Row, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const BuilderLayout = (props) => (
  <div className="builder">
    <Grid>
      <Row>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Some Company</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to={{ pathname: '/builder/welcome' }}>
              <NavItem className="active">Welcome</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/builder/questions' }}>
              <NavItem>Questions</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/builder/review' }}>
              <NavItem>Review</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/builder/products' }}>
              <NavItem>Products</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </Row>
      <Grid>
        <Row>
          {props.children}
        </Row>
      </Grid>
    </Grid>
  </div>
);

BuilderLayout.propTypes = {
  children: React.PropTypes.element,
};

export default BuilderLayout;
