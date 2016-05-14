import React from 'react';

import WizardAnswer from './WizardAnswer';

const renderAnswers = (props) => {
  const content = props.question.availableAnswers.map((answer) => {
    return <WizardAnswer key={answer.answerId} answer={answer} />;
  });
  return content;
};

const WizardQuestion = (props) => {
  return (
    <div className="wizard-question">
      <h1 className="wizard-question-title">{props.question.question}</h1>
      {renderAnswers(props)}
    </div>
  );
};

WizardQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
};

export default WizardQuestion;
