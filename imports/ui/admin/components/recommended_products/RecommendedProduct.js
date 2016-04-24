import React from 'react';
import { Meteor } from 'meteor/meteor';

import GenderList from './GenderList.jsx';
import SportList from './SportList.jsx';
import HourList from './HourList.jsx';
import RemoveRecommendedProductButton
  from './RemoveRecommendedProductButton.js';

const imageHost = Meteor.settings.public.admin.products.imageHost;

const RecommendedProduct = ({ product }) => (
  <tr className="recommended-product">
    <td>
      <img src={`${imageHost}${product.productImage}`} alt="Product"
        className="product-image"
      />
    </td>
    <td>{product.productName}</td>
    <td>{product.variationName}</td>
    <td>
      <GenderList productId={product._id} gender={product.gender} />
    </td>
    <td>
      <SportList productId={product._id} sports={product.sports} />
    </td>
    <td>
      <HourList productId={product._id} hours={product.hours} />
    </td>
    <td>
      <RemoveRecommendedProductButton _id={product._id}
        variationId={product.variationId}
      />
    </td>
  </tr>
);

RecommendedProduct.propTypes = {
  product: React.PropTypes.object,
};

export default RecommendedProduct;
