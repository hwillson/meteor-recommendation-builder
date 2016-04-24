import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import RecommendedProductList
  from '../components/recommended_products/RecommendedProductList.js';
import AddProductModal
  from '../components/products/AddProductModal.jsx';

class RecommendedProductsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.showHideAddProductModal = this.showHideAddProductModal.bind(this);
    this.showAddProductModal = this.showAddProductModal.bind(this);
  }

  showHideAddProductModal(newState) {
    this.setState({
      showModal: newState,
    });
  }

  showAddProductModal() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <div className="products-page">
        <Row>
          <Col md={10}>
            <h1>Recommended Products</h1>
          </Col>
          <Col md={2}>
            <Button bsStyle="primary"
              className="add-product pull-right"
              onClick={this.showAddProductModal}
              ref="addProductButton"
            >
              <FontAwesome name="plus-circle" /> Add Product
            </Button>
          </Col>
        </Row>
        <RecommendedProductList loading={this.props.loading}
          products={this.props.products}
          productsExist={this.props.productsExist}
        />
        <AddProductModal showModal={this.state.showModal}
          handleShowHideModal={this.showHideAddProductModal}
        />
      </div>
    );
  }

}

RecommendedProductsPage.propTypes = {
  loading: React.PropTypes.bool,
  products: React.PropTypes.array,
  productsExist: React.PropTypes.bool,
};

export default RecommendedProductsPage;
