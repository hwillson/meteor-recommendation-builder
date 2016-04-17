import React from 'react';
import { Row, Col } from 'react-bootstrap';
// import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';

import Product from './Product.jsx';
// import ProductListLoading from './ProductListLoading.jsx';
// import recommendedProducts from '/imports/api/recommended_products/collection.js';

const renderProductList = ({ loading, products, productsExist }) => {
  let productListContent = 'Loading recommended products ...';
  if (!loading) {
    if (productsExist) {
      productListContent = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                Product
              </th>
              <th>
                Gender
              </th>
              <th>
                Sport
              </th>
              <th>
                Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      );
    } else {
      productListContent = 'No recommended products.';
    }
  }
  return productListContent;
};

const ProductList = ({ loading, products, productsExist }) => {
  const productList = renderProductList({ loading, products, productsExist });
  return (
    <Row className="products">
      <Col md={12}>
        {productList}
      </Col>
    </Row>
  );
  // return (
  //   <Row className="products">
  //     <Col md={12}>
  //       <MeteorGriddle
  //         publication="recommendedProducts.all"
  //         collection={recommendedProducts}
  //         externalLoadingComponent={ProductListLoading}
  //       />
  //     </Col>
  //   </Row>
  // );
};

ProductList.propTypes = {
  loading: React.PropTypes.bool,
  products: React.PropTypes.array,
  productsExist: React.PropTypes.bool,
};

export default ProductList;
