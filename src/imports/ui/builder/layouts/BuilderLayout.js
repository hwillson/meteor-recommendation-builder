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
              <NavItem>1. Welcome</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/builder/questions' }}>
              <NavItem>2. Questions</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/builder/products' }}>
              <NavItem>3. Products</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </Row>
      <Grid>
        {React.cloneElement(
          props.children,
          {
            questions: props.questions,
            customerSession: props.customerSession,
          }
        )}
      </Grid>
    </Grid>
  </div>
);

BuilderLayout.propTypes = {
  questions: React.PropTypes.array.isRequired,
  customerSession: React.PropTypes.object.isRequired,
  children: React.PropTypes.element,
};

BuilderLayout.defaultProps = {
  customerSession: {
    answers: {},
  },
};

export default BuilderLayout;
