import React from 'react';
import { Navbar, Row, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <header>
    <Row>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand className="hidden-xs">
            <a href="/todo">Some Company</a>
          </Navbar.Brand>
          <Navbar.Brand className="visible-xs-block">
            <a href="/todo">SC</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to={{ pathname: '/builder/welcome' }}>
            <NavItem>
              <span className="number-circle">1</span>
              <span className="hidden-xs">Welcome</span>
              <i className="fa fa-chevron-right" />
            </NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/builder/questions' }}>
            <NavItem>
              <span className="number-circle">2</span>
              <span className="hidden-xs">Questions</span>
              <i className="fa fa-chevron-right" />
            </NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/builder/products' }}>
            <NavItem>
              <span className="number-circle">3</span>
              <span className="hidden-xs">Products</span>
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </Row>
  </header>
);

export default Header;
