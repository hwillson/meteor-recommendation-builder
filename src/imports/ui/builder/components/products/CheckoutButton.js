import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutButton = ({ disabled }) => {
  const button = (
    <Button bsStyle="primary" className="checkout-button" disabled={disabled}>
      Checkout
    </Button>
  );
  let buttonLink;
  if (disabled) {
    buttonLink = button;
  } else {
    buttonLink = (
      <LinkContainer to={{ pathname: '/builder/checkout' }}>
        {button}
      </LinkContainer>
    );
  }
  return buttonLink;
};

CheckoutButton.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
};

CheckoutButton.defaultProps = {
  disabled: false,
};

export default CheckoutButton;
