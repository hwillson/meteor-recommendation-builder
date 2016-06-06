import React from 'react';
import s from 'underscore.string';

import { maybePluralizeItemsLabel } from './CartTotalsHelpers';

const CartTotals = ({ cartTotals }) => (
  <span className="cart-total">
    {cartTotals.totalItems}
    {maybePluralizeItemsLabel(cartTotals.totalItems)} for
    ${s.numberFormat(cartTotals.totalPrice, 2)}
  </span>
);

CartTotals.propTypes = {
  cartTotals: React.PropTypes.object.isRequired,
};

export default CartTotals;
