import React from 'react';
import s from 'underscore.string';

import maybePluralizeItemsLabel from './CartTotalsHelpers';

const CartTotals = ({ cartTotals }) => (
  <div className="cart-totals">
    {cartTotals.totalItems}
    {maybePluralizeItemsLabel(cartTotals.totalItems)} for
    ${s.numberFormat(cartTotals.totalPrice, 2)}
  </div>
);

CartTotals.propTypes = {
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartTotals;
