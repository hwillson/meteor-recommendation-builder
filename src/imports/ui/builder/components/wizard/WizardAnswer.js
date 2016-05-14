import React from 'react';

const WizardAnswer = (props) => (
  <div className="wizard-answer">
    <div className="wizard-answer-image"></div>
    <div className="wizard-answer-content">
      {props.answer.answer}
    </div>
  </div>
);

WizardAnswer.propTypes = {
  answer: React.PropTypes.object.isRequired,
};

export default WizardAnswer;
