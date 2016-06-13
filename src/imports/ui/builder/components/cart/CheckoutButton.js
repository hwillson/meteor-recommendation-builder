import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Session, _, Meteor } from '../../../../utility/meteor/packages';

function cleanCartProducts(cartProducts) {
  const products = [];
  if (!_.isEmpty(cartProducts)) {
    cartProducts.forEach((product) => {
      products.push({
        productId: product.productId,
        variationId: product.variationId,
        quantity: product.quantity,
      });
    });
  }
  return JSON.stringify(products);
}

const CheckoutButton = ({ cartProducts, disabled }) => (
  <div className="checkout">
    <form action={Meteor.settings.public.store.cartReceiverUrl} method="POST">
      <FormControl
        type="hidden"
        value={cleanCartProducts(cartProducts)}
        name="cart_products"
      />
      <Button
        bsStyle="primary"
        className="checkout-button"
        disabled={disabled}
        type="submit"
        onClick={() => { Session.set('showProcessingOverlay', true); }}
      >
        Checkout
      </Button>
    </form>
  </div>
);

CheckoutButton.propTypes = {
  cartProducts: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool.isRequired,
};

CheckoutButton.defaultProps = {
  disabled: false,
};

export default CheckoutButton;
