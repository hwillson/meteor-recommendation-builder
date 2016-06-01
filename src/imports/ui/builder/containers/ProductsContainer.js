import { Meteor, createContainer } from '../../../utility/meteor/packages';

import ProductsPage from '../pages/ProductsPage';
import products from '../../../api/products/collection';
import ProductTotals from '../../../api/products/product_totals';

export const ProductsContainer = createContainer(({
  questions,
  customerSession,
}) => {
  const productsHandle = Meteor.subscribe('products.all');
  const loading = !productsHandle.ready();

  let loadedProducts;
  const productTotals = Object.create(ProductTotals);
  if (customerSession && customerSession._id) {
    const productFilter = customerSession.questionAndAnswerFilter(questions);
    loadedProducts = products.find(productFilter, {
      sort: {
        [Meteor.settings.public.products.sortBy]:
          [Meteor.settings.public.products.sortOrder],
      },
    }).fetch();

    productTotals.init(loadedProducts);
  }

  const productsExist =
    !loading && loadedProducts && (loadedProducts.length > 0);
  return {
    loading,
    productsExist,
    products: loadedProducts,
    productTotals,
  };
}, ProductsPage);
