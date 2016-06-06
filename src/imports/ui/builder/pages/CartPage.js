import React from 'react';

import ExpertMessage from '../components/cart/ExpertMessage';
import Promotion from '../components/cart/Promotion';
import CartControls from '../components/cart/CartControls';
import CartItems from '../components/cart/CartItems';
import Footer from '../components/footer/Footer';

const CartPage = ({ loading, products, cartItems, cartTotals }) => (
  <div className="cart-page">
    <ExpertMessage />
    <CartControls cartTotals={cartTotals} />
    <Promotion />
    <CartItems loading={loading} products={products} cartItems={cartItems} />
    <CartControls cartTotals={cartTotals} />
    <Footer />
  </div>
);

CartPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  products: React.PropTypes.array.isRequired,
  cartItems: React.PropTypes.array.isRequired,
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartPage;
