import { Meteor, createContainer } from '../../../utility/meteor/packages';

import ProductsPage from '../pages/ProductsPage';
import products from '../../../api/products/collection';

export const ProductsContainer = createContainer(({
  questions,
  customerSession,
}) => {
  const productsHandle = Meteor.subscribe('products.all');
  const loading = !productsHandle.ready();

  let loadedProducts;
  if (customerSession && customerSession._id) {
    const productFilter = customerSession.questionAndAnswerFilter(questions);
    loadedProducts = products.find(productFilter, {
      sort: {
        [Meteor.settings.public.products.sortBy]:
          [Meteor.settings.public.products.sortOrder],
      },
    }).fetch();
  }

  const productsExist =
    !loading && loadedProducts && (loadedProducts.length > 0);
  return {
    loading,
    products: loadedProducts,
    productsExist,
    customerSession,
  };
}, ProductsPage);
