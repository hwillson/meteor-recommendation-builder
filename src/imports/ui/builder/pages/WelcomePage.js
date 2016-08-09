/* global window */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const WelcomePage = () => (
  <div className="welcome-page">
    <Row>
      <Col md={12} className="no-padding">
        <img
          src="/images/welcome/welcome.png"
          alt="Welcome"
          className="img-responsive"
        />
      </Col>
    </Row>
    <Row className="welcome-title">
      <Col smOffset={1} sm={8} mdOffset={1} md={6}>
        <h1>
          Welcome to Our Product Recommendation Builder!
        </h1>
      </Col>
    </Row>
    <Row className="welcome-content">
      <Col
        smOffset={1} sm={8} mdOffset={1} md={6} className="welcome-content-col"
      >
        <p>
          Hey, glad you're here! Looking for something new but not sure where to
          start? You've come to the right place! Try our product recommendation
          builder. You'll be asked to answer a few questions, then our tame but
          intelligent robots will be put to work, coming up with product
          recommendations for you. You'll then be able to adjust these
          recommendations, and head over to our store to purchase anything
          you're interested in.
        </p>
        <div className="text-center">
          <LinkContainer to={{ pathname: '/builder/questions' }}>
            <Button
              bsStyle="primary"
              onClick={() => { window.scrollTo(0, 0); }}
            >
              Get Started <i className="fa fa-arrow-right" />
            </Button>
          </LinkContainer>
        </div>
      </Col>
    </Row>
  </div>
);

export default WelcomePage;
