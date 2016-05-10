import React from 'react';
import { Meteor } from 'meteor/meteor';

const ProductImage = (props) => {
  const imgUrl =
    `${Meteor.settings.public.admin.products.imageHost}${props.data}`;
  return (
    <img src={imgUrl} alt="Product" className="product-image" />
  );
};

ProductImage.propTypes = {
  data: React.PropTypes.string,
};

export default ProductImage;
