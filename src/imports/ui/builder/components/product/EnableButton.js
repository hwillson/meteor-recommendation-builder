import React from 'react';
import { Button } from 'react-bootstrap';

const EnableButton = ({ product }) => {
  let button = null;
  if (!product.enabled) {
    button = (
      <Button bsStyle="link" onClick={() => product.enable()}>
        Add Back
      </Button>
    );
  }
  return button;
};

EnableButton.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default EnableButton;
