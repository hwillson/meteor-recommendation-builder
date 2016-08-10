import {
  Meteor,
  createContainer,
  Session,
  _,
} from '../../../utility/meteor/packages';

import CartPage from '../pages/CartPage';
import products from '../../../api/products/collection';
import cart from '../../../api/cart/collection';

let loadedProducts = [];

const CartContainer = createContainer(({
  questions,
  customerSession,
  expert,
}) => {
  const productsHandle = Meteor.subscribe('products.all');
  const loading = !productsHandle.ready();

  let cartProducts = [];
  const cartTotals = {
    totalItems: 0,
    totalPrice: 0,
  };

  let customerName;

  const refresh = Session.get('refreshRecommendations');
  if (customerSession && customerSession._id && refresh) {
    const productFilter = customerSession.questionAndAnswerFilter(questions);
    loadedProducts = products.find(productFilter, {
      sort: {
        [Meteor.settings.public.products.sortBy]:
          [Meteor.settings.public.products.sortOrder],
      },
    }).fetch();
    if (!_.isEmpty(loadedProducts)) {
      Session.set('refreshRecommendations', false);
    }
    cart.clearAndSetProducts(loadedProducts);

    customerName = customerSession.customerName;
  }

  cartProducts = cart.find().fetch();
  cartTotals.totalItems = cart.totalItems();
  cartTotals.totalPrice = cart.totalPrice();

  return {
    loading,
    cartProducts,
    cartTotals,
    expert,
    customerName,
  };
}, CartPage);

export default CartContainer;
