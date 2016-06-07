import React from 'react';
import { Button } from 'react-bootstrap';

const DisableButton = ({ product }) => {
  let button = null;
  if (product.enabled) {
    button = (
      <Button bsStyle="link" onClick={() => product.disable()}>
        X
      </Button>
    );
  }
  return button;
};

DisableButton.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default DisableButton;
