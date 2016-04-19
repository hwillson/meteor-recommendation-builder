import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import productSchema from '../schema.js';
import products from '../collection.js';

const productSynch = (() => {
  const _public = {

    run() {
      const synchStatus = {
        success: false,
        fetchedProductCount: 0,
      };
      const response = HTTP.get(Meteor.settings.private.productSynch.sourceUrl);
      if (response && response.data && response.data.data) {
        const fetchedProducts = JSON.parse(response.data.data);
        products.remove({});
        const validationContext = productSchema.newContext();
        fetchedProducts.forEach((fetchedProduct) => {
          productSchema.clean(fetchedProduct);
          if (validationContext.validate(fetchedProduct)) {
            products.insert(fetchedProduct);
            synchStatus.fetchedProductCount += 1;
          }
        });
        synchStatus.success = true;
      }
      return synchStatus;
    },

  };

  return _public;
})();

export default productSynch;
