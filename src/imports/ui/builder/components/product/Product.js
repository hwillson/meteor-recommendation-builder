import React from 'react';
import s from 'underscore.string';

import DisableButton from './DisableButton';
import EnableButton from './EnableButton';
import ProductDescription from './ProductDescription';
import QuantityStepper from './QuantityStepper';
import ProductVariationSelect from './ProductVariationSelect';

// components:
// image
// description with more option
// title
// price
// flavour variation dropdown
// quantity stepper

// actions:
// remove
// select new flavour, change image
// add/remove quantity (don't let go below 1)

const Product = ({ product }) => {
  const disabled = (product.enabled) ? '' : 'disabled';
  return (
    <div className={`product ${disabled}`}>
      <DisableButton product={product} />
      <img src={product.productImage} alt="Product" />
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
