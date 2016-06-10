import React from 'react';
import { Row, Col } from 'react-bootstrap';

import CartTotals from './CartTotals';
import CheckoutButton from './CheckoutButton';

const CartControls = ({ cartTotals }) => {
  const checkoutDisabled = (!cartTotals || (cartTotals.totalItems === 0));
  return (
    <Row className="cart-controls">
      <Col mdOffset={3} md={3} className="text-right">
        <CartTotals cartTotals={cartTotals} />
      </Col>
      <Col md={3}>
        <CheckoutButton disabled={checkoutDisabled} />
      </Col>
    </Row>
  );
};

CartControls.propTypes = {
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartControls;
