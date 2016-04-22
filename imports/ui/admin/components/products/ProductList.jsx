import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';

import products from '/imports/api/products/collection.js';

const ProductList = () => (
  <Row className="products">
    <Col md={12}>
      <MeteorGriddle
        publication="products.all"
        collection={products}
      />
    </Col>
  </Row>
);

export default ProductList;
