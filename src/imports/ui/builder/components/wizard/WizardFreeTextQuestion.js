import React from 'react';

import WizardFreeTextAnswer from './WizardFreeTextAnswer';

const WizardFreeTextQuestion = ({ question, customerSession }) => (
  <div className="wizard-question">
    <h1 className="wizard-question-title">
      {question.question}
    </h1>
    <WizardFreeTextAnswer
      question={question}
      customerSession={customerSession}
    />
  </div>
);

WizardFreeTextQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export default WizardFreeTextQuestion;
