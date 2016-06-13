import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Grid } from 'react-bootstrap';

import Header from '../components/header/Header';
import ProcessingOverlay from '../components/processing/ProcessingOverlay';

const BuilderLayout = (props) => (
  <div className="builder">
    <Grid className="header-container">
      <Header />
    </Grid>
    <Grid className="content-container">
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        {React.cloneElement(
          props.children,
          {
            key: props.location.pathname,
            questions: props.questions,
            customerSession: props.customerSession,
            expert: props.expert,
          }
        )}
      </ReactCSSTransitionGroup>
    </Grid>
    <ProcessingOverlay show={props.showProcessingOverlay} />
  </div>
);

BuilderLayout.propTypes = {
  location: React.PropTypes.object,
  questions: React.PropTypes.array.isRequired,
  customerSession: React.PropTypes.object.isRequired,
  showProcessingOverlay: React.PropTypes.bool,
  expert: React.PropTypes.object,
  children: React.PropTypes.element,
};

BuilderLayout.defaultProps = {
  customerSession: {
    answers: {},
  },
};

export default BuilderLayout;
