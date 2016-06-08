import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const WelcomePage = () => (
  <Row className="welcome-page">
    <Col mdOffset={1} md={6}>
      <h1>Welcome to Our Product Recommendation Builder!</h1>
      <p>
        Hey, glad you're here! Looking for something new but not sure where to
        start? You've come to the right place! Try out product recommendation
        builder. You'll be asked to answer a few questions, then our tame but
        intelligent robots will be put to work, coming up with product
        recommendations for you. You'll then be able to adjust these
        recommendations, and head over to our store to purchase anything
        you're interested in.
      </p>
      <div className="text-center">
        <LinkContainer to={{ pathname: '/builder/questions' }}>
          <Button bsStyle="primary">
            Get Started <i className="fa fa-arrow-right"></i>
          </Button>
        </LinkContainer>
      </div>
    </Col>
  </Row>
);

export default WelcomePage;
