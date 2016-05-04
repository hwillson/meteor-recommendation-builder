import React from 'react';
import { Button } from 'react-bootstrap';

const WelcomePage = () => (
  <div className="welcome-page">
    <h1>Welcome!</h1>
    <p>
      Well, the way they make shows is, they make one show. That show's called
      a pilot. Then they show that show to the people who make shows, and on
      the strength of that one show they decide if they're going to make more
      shows. Some pilots get picked and become television programs. Some
      don't, become nothing. She starred in one of the ones that became
      nothing.
    </p>
    <Button bsStyle="primary">
      Get Started
    </Button>
  </div>
);

export default WelcomePage;
