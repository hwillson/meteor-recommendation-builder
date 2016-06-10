import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ExpertWelcome from '../components/cart/ExpertWelcome';
// import Promotion from '../components/cart/Promotion';
import CartControls from '../components/cart/CartControls';
import CartProducts from '../components/cart/CartProducts';
import ExpertContact from '../components/footer/ExpertContact';
import Footer from '../components/footer/Footer';

const CartPage = ({
  loading, cartProducts, cartTotals, expert, customerName,
}) => (
  <div className="cart-page">
    <ExpertWelcome expert={expert} customerName={customerName} />
    <CartControls cartTotals={cartTotals} />
    {/*<Promotion />*/}
    <Row className="cart-products-container">
      <Col mdOffset={1} md={10}>
        <CartProducts loading={loading} cartProducts={cartProducts} />
      </Col>
    </Row>
    <CartControls cartTotals={cartTotals} />
    <ExpertContact expert={expert} />
    <Footer />
  </div>
);

CartPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  cartProducts: React.PropTypes.array.isRequired,
  cartTotals: React.PropTypes.object.isRequired,
  expert: React.PropTypes.object,
  customerName: React.PropTypes.string,
};

export default CartPage;
