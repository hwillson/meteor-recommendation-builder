import React from 'react';
import { Button } from 'react-bootstrap';

const DisableButton = ({ cartItem }) => {
  let button = null;
  if (cartItem.enabled) {
    button = (
      <Button bsStyle="link" onClick={() => cartItem.disable()}>
        X
      </Button>
    );
  }
  return button;
};

DisableButton.propTypes = {
  cartItem: React.PropTypes.object.isRequired,
};

export default DisableButton;
