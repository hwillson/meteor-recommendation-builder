import React from 'react';
import { Meteor } from 'meteor/meteor';

const ProductLink = (props) => {
  const link =
    `${Meteor.settings.public.admin.products.productUrl}`
    + `${props.rowData.externalProductId}`;
  return (
    <a href={link} target="_blank">{props.data}</a>
  );
};

ProductLink.propTypes = {
  data: React.PropTypes.string,
  rowData: React.PropTypes.object,
};

export default ProductLink;
