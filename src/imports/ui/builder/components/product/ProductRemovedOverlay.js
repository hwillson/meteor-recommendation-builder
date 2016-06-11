import React from 'react';
import { Button } from 'react-bootstrap';

const ProductRemovedOverlay = ({ product }) => {
  let overlay = null;
  if (!product.enabled) {
    overlay = (
      <div className="product-removed-overlay">
        <div className="item-removed">
          <p>Item Removed</p>
          <Button
            bsStyle="primary"
            onClick={() => product.enable()}
            className="add-back-button"
          >
            Add Back
          </Button>
        </div>
      </div>
    );
  }
  return overlay;
};

ProductRemovedOverlay.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default ProductRemovedOverlay;
