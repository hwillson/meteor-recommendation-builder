import React from 'react';
import { Button } from 'react-bootstrap';
import { Session } from '../../../../utility/meteor/packages';
import { LinkContainer } from 'react-router-bootstrap';

function setRefreshRecommendationsFlag() {
  Session.set('refreshRecommendations', true);
}

const GenerateRecommendationsButton = ({ disabled }) => {
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
  disabled: React.PropTypes.bool.isRequired,
};

export default GenerateRecommendationsButton;
