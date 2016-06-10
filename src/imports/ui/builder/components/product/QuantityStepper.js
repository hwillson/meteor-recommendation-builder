import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const QuantityStepper = ({ product }) => (
  <ButtonGroup className="quantity-stepper">
    <Button onClick={() => { product.decreaseQuantity(); }}>-</Button>
    <Button disabled>{product.quantity}</Button>
    <Button onClick={() => { product.increaseQuantity(); }}>+</Button>
  </ButtonGroup>
);

QuantityStepper.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default QuantityStepper;
