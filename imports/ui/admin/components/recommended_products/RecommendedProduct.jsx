import React from 'react';

import GenderList from './GenderList.jsx';
import SportList from './SportList.jsx';
import HourList from './HourList.jsx';

const RecommendedProduct = ({ product }) => (
  <tr className="recommended-product">
    <td>{product.productName}</td>
    <td>
      <GenderList productId={product._id} gender={product.gender} />
    </td>
    <td>
      <SportList productId={product._id} sports={product.sports} />
    </td>
    <td>
      <HourList productId={product._id} hours={product.hours} />
    </td>
  </tr>
);

RecommendedProduct.propTypes = {
  product: React.PropTypes.object,
};

export default RecommendedProduct;
