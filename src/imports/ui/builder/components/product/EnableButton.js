import React from 'react';
import { Button } from 'react-bootstrap';

const EnableButton = ({ cartItem }) => {
  let button = null;
  if (!cartItem.enabled) {
    button = (
      <Button bsStyle="link" onClick={() => cartItem.enable()}>
        Add Back
      </Button>
    );
  }
  return button;
};

EnableButton.propTypes = {
  cartItem: React.PropTypes.object.isRequired,
};

export default EnableButton;
