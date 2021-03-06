import React from 'react';
import { Row, Col } from 'react-bootstrap';

import RecommendedProduct from './RecommendedProduct.js';

const renderProductList = ({ loading, questions, products, productsExist }) => {
  let productListContent = 'Loading recommended products ...';
  if (!loading) {
    if (productsExist) {
      productListContent = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                Product Image
              </th>
              <th>
                Product Name
              </th>
              <th>
                Variation Name
              </th>
              <th>
                Matched Answers
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <RecommendedProduct key={product._id} product={product}
                questions={questions}
              />
            ))}
          </tbody>
        </table>
      );
    } else {
      productListContent = (
        <div className="no-products">
          No recommended products.
        </div>
      );
    }
  }
  return productListContent;
};

const RecommendedProductList =
  ({ loading, questions, products, productsExist }) => {
    const productList =
      renderProductList({ loading, questions, products, productsExist });
    return (
      <Row className="recommended-products">
        <Col md={12}>
          {productList}
        </Col>
      </Row>
    );
  };

RecommendedProductList.propTypes = {
  loading: React.PropTypes.bool,
  questions: React.PropTypes.array,
  products: React.PropTypes.array,
  productsExist: React.PropTypes.bool,
};

export default RecommendedProductList;
