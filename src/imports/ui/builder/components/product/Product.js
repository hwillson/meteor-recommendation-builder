import React from 'react';
import s from 'underscore.string';

import DisableButton from './DisableButton';
import EnableButton from './EnableButton';
import ProductDescription from './ProductDescription';
import QuantityStepper from './QuantityStepper';
import ProductVariationSelect from './ProductVariationSelect';

const Product = ({ product }) => {
  const disabled = (product.enabled) ? '' : 'disabled';
  return (
    <div className={`product ${disabled}`}>
      <div className="text-right">
        <DisableButton product={product} />
      </div>
      <div className="product-image-container">
        <img src={product.productImage} alt="Product" />
      </div>
      <ProductDescription product={product} />
      <EnableButton product={product} />
      <div className="product-controls">
        <h1>{product.productName}</h1>
        <div className="product-price">
          ${s.numberFormat(product.variationPrice, 2)}
        </div>
        <ProductVariationSelect product={product} />
        <QuantityStepper product={product} />
      </div>
    </div>
  );
};

Product.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default Product;
