import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';

import products from '/imports/api/products/collection.js';
import RecommendProductButton from './RecommendProductButton.js';
import ProductImage from './ProductImage.js';
import ProductLink from './ProductLink.js';

const columnMetadata = [
  {
    columnName: 'productImage',
    displayName: 'Product Image',
    customComponent: ProductImage,
  },
  {
    columnName: 'productName',
    displayName: 'Product Name',
    customComponent: ProductLink,
  },
  {
    columnName: 'variationName',
    displayName: 'Variation Name',
  },
  {
    columnName: 'variationId',
    displayName: 'Recommend Product?',
    customComponent: RecommendProductButton,
  },
];

const subsManager = new SubsManager();
const ProductList = () => (
  <Row className="products">
    <Col md={12}>
      <MeteorGriddle
        publication="products.notRecommended"
        collection={products}
        columnMetadata={columnMetadata}
        columns={[
          'productImage',
          'productName',
          'variationName',
          'variationId',
        ]}
        showFilter
        subsManager={subsManager}
        externalSortColumn="productName"
      />
    </Col>
  </Row>
);

export default ProductList;
