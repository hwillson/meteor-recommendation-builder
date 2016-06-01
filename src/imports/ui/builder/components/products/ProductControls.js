import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ProductTotals from './ProductTotals';
import CheckoutButton from './CheckoutButton';

const ProductControls = ({ productTotals }) => {
  const checkoutDisabled = (!productTotals || (productTotals.totalItems === 0));
  return (
    <div className="product-controls">
      <Row>
        <Col mdOffset={4} md={2}>
          <ProductTotals productTotals={productTotals} />
        </Col>
        <Col md={2}>
          <CheckoutButton disabled={checkoutDisabled} />
        </Col>
      </Row>
    </div>
  );
};

ProductControls.propTypes = {
  productTotals: React.PropTypes.object,
};

export default ProductControls;
