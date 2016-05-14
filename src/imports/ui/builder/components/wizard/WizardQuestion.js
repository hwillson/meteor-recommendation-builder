import React from 'react';

const WizardQuestion = (props) => {
  return (
    <div className="wizard-question">
      {props.question.question}
    </div>
  );
};

WizardQuestion.propTypes = {
  question: React.PropTypes.object,
};

export default WizardQuestion;
