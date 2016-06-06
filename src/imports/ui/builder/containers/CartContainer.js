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

export const CartContainer = createContainer(({
  questions,
  customerSession,
}) => {
  const productsHandle = Meteor.subscribe('products.all');
  const loading = !productsHandle.ready();

  let cartItems = [];
  const cartTotals = {
    totalItems: 0,
    totalPrice: 0,
  };

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
  }

  cartItems = cart.find().fetch();
  cartTotals.totalItems = cart.totalItems();
  cartTotals.totalPrice = cart.totalPrice();

  return {
    loading,
    products: loadedProducts,
    cartItems,
    cartTotals,
  };
}, CartPage);
