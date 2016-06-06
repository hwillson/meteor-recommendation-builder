import React from 'react';
import { Button } from 'react-bootstrap';
import { _, Session } from '../../../../utility/meteor/packages';
import { LinkContainer } from 'react-router-bootstrap';

function areMandatoryQuestionsAnswered(questions, customerSession) {
  let mandatoryQuestionsAnswered = false;
  if (!_.isEmpty(customerSession.answers)) {
    questions.forEach((question) => {
      if (question.mandatory) {
        const questionAnswers = customerSession.answers[question._id];
        mandatoryQuestionsAnswered = true;
        if (_.isEmpty(questionAnswers)) {
          mandatoryQuestionsAnswered = false;
          return;
        }
      }
    });
  }
  return mandatoryQuestionsAnswered;
}

function setRefreshRecommendationsFlag() {
  Session.set('refreshRecommendations', true);
}

const GenerateRecommendationsButton = ({ questions, customerSession }) => {
  const disabled = !areMandatoryQuestionsAnswered(questions, customerSession);
  const button = (
    <Button
      bsStyle="primary"
      className="generate-recommendations-button"
      disabled={disabled}
      onClick={setRefreshRecommendationsFlag}
    >
      Generate Recommendations
    </Button>
  );
  let buttonLink;
  if (disabled) {
    buttonLink = button;
  } else {
    buttonLink = (
      <LinkContainer
        to={{ pathname: '/builder/products' }}
      >
        {button}
      </LinkContainer>
    );
  }
  return buttonLink;
};

GenerateRecommendationsButton.propTypes = {
  questions: React.PropTypes.array.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export default GenerateRecommendationsButton;
