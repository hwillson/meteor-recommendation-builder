import React from 'react';
import { Row, Col } from 'react-bootstrap';

import CartTotals from './CartTotals';
import CheckoutButton from './CheckoutButton';

const CartControls = ({ cartTotals }) => {
  const checkoutDisabled = (!cartTotals || (cartTotals.totalItems === 0));
  return (
    <div className="cart-controls">
      <Row>
        <Col mdOffset={4} md={2}>
          <CartTotals cartTotals={cartTotals} />
        </Col>
        <Col md={2}>
          <CheckoutButton disabled={checkoutDisabled} />
        </Col>
      </Row>
    </div>
  );
};

CartControls.propTypes = {
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartControls;
