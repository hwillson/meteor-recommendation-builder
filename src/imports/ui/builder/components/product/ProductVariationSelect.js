import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

import products from '../../../../api/products/collection';

const ProductVariationSelect = ({ product }) => (
  <FormGroup className="product-variation-select">
    <FormControl
      componentClass="select"
      onChange={(event) => { product.changeProductVariation(event.target.value); }}
      value={product._id}
    >
      {products.getVariationsForProduct(product.productId).map((variation) => (
        <option key={variation._id} value={variation._id}>
          {variation.variationName}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

ProductVariationSelect.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default ProductVariationSelect;
