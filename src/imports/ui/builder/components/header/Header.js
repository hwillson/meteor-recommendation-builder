import React from 'react';
import { Navbar, Row, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <header>
    <Row>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Some Company</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to={{ pathname: '/builder/welcome' }}>
            <NavItem>
              <span className="number-circle">1</span>
              Welcome
              <i className="fa fa-chevron-right"></i>
            </NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/builder/questions' }}>
            <NavItem>
              <span className="number-circle">2</span>
              Questions
              <i className="fa fa-chevron-right"></i>
            </NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/builder/products' }}>
            <NavItem>
              <span className="number-circle">3</span>
              Products
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </Row>
  </header>
);

export default Header;
