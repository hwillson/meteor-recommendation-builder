import React from 'react';
import { Grid } from 'react-bootstrap';

import Header from '../components/header/Header';

const BuilderLayout = (props) => (
  <div className="builder">
    <Grid className="header-container">
      <Header />
    </Grid>
    <Grid className="content-container">
      {React.cloneElement(
        props.children,
        {
          questions: props.questions,
          customerSession: props.customerSession,
        }
      )}
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
