import React from 'react';

const ProductDescription = ({ product }) => (
  <div className="product-description">
    {product.productDescription}
  </div>
);

ProductDescription.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default ProductDescription;
