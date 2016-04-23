import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';

import products from '/imports/api/products/collection.js';
import RecommendProductButton from './RecommendProductButton.js';

const columnMetadata = [
  {
    columnName: 'productImage',
    displayName: 'Product Image',
  },
  {
    columnName: 'productName',
    displayName: 'Product Name',
  },
  {
    columnName: 'variationName',
    displayName: 'Variation Name',
  },
  {
    columnName: '_id',
    displayName: 'Recommend Product?',
    customComponent: RecommendProductButton,
  },
];

const ProductList = () => (
  <Row className="products">
    <Col md={12}>
      <MeteorGriddle
        publication="products.all"
        collection={products}
        columnMetadata={columnMetadata}
        columns={[
          'productImage',
          'productName',
          'variationName',
          '_id',
        ]}
        showFilter
      />
    </Col>
  </Row>
);

export default ProductList;
