import React from 'react';

import DisableButton from './DisableButton';
import EnableButton from './EnableButton';

// components:
// remove button
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

const Product = ({ product, variationId, cartItem }) => {
  const disabled = (cartItem.enabled) ? '' : 'disabled';
  return (
    <div className={`product ${disabled}`}>
      <DisableButton cartItem={cartItem} />
      Product
      <EnableButton cartItem={cartItem} />
    </div>
  );
};

Product.propTypes = {
  product: React.PropTypes.object.isRequired,
  variationId: React.PropTypes.number.isRequired,
  cartItem: React.PropTypes.object.isRequired,
};

export default Product;
