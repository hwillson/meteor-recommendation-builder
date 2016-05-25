import { Meteor, HTTP, _ } from '../../../utility/meteor/packages';

import products from '../collection.js';

export const ProductSynch = {
  run() {
    const response = HTTP.get(Meteor.settings.private.productSynch.sourceUrl);
    if (response && !_.isEmpty(response.data)) {
      products.remove({});
      const fetchedProducts = response.data;
      fetchedProducts.forEach((fetchedProduct) => {
        if (!_.isEmpty(fetchedProduct.products)) {
          const loadedProducts = fetchedProduct.products;
          loadedProducts.forEach((loadedProduct) => {
            products.insert(loadedProduct);
          });
        }
      });
    }
  },
};
