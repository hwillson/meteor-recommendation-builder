import React from 'react';

import ExpertMessage from '../components/cart/ExpertMessage';
import Promotion from '../components/cart/Promotion';
import CartControls from '../components/cart/CartControls';
import CartProducts from '../components/cart/CartProducts';
import Footer from '../components/footer/Footer';

const CartPage = ({ loading, cartProducts, cartTotals }) => (
  <div className="cart-page">
    <ExpertMessage />
    <CartControls cartTotals={cartTotals} />
    <Promotion />
    <CartProducts loading={loading} cartProducts={cartProducts} />
    <CartControls cartTotals={cartTotals} />
    <Footer />
  </div>
);

CartPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  cartProducts: React.PropTypes.array.isRequired,
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartPage;
