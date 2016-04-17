import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ProductList from '../components/ProductList.jsx';
import AddProductModal from '../components/AddProductModal.jsx';

class ProductsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.showAddProductModal = this.showAddProductModal.bind(this);
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
            >
              <FontAwesome name="plus-circle" /> Add Product
            </Button>
          </Col>
        </Row>
        <ProductList loading={this.props.loading}
          products={this.props.products}
          productsExist={this.props.productsExist}
        />
        <AddProductModal showModal={this.state.showModal} />
      </div>
    );
  }

}

ProductsPage.propTypes = {
  loading: React.PropTypes.bool,
  products: React.PropTypes.array,
  productsExist: React.PropTypes.bool,
};

export default ProductsPage;
