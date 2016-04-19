import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

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
        fetchedProducts.forEach((fetchedProduct) => {
          products.insert(fetchedProduct);
          synchStatus.fetchedProductCount += 1;
        });
        synchStatus.success = true;
      }
      return synchStatus;
    },

  };

  return _public;
})();

export default productSynch;
