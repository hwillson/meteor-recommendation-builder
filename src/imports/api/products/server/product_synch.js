import { Meteor, HTTP, _ } from '../../../utility/meteor/packages';

import products from '../collection.js';

const ProductSynch = {
  run() {
    const response = HTTP.get(Meteor.settings.private.productSynch.sourceUrl);
    if (response && !_.isEmpty(response.data)) {
      products.remove({});
      const fetchedProducts = response.data;
      fetchedProducts.forEach((fetchedProduct) => {
        products.insert(fetchedProduct);
      });
    }
  },
};

export default ProductSynch;
