import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import productSchema from '../schema.js';
import products from '../collection.js';
import recommendedProducts from '../../recommended_products/collection.js';

const productSynch = (() => {
  const _public = {

    run() {
      const synchStatus = {
        success: false,
        fetchedProductCount: 0,
      };
      const response = HTTP.get(Meteor.settings.private.productSynch.sourceUrl);
      if (response && response.data && response.data.data) {
        const recommendedProductIds = [];
        recommendedProducts.find().forEach((recommendedProduct) => {
          recommendedProductIds.push(recommendedProduct.variationId);
        });

        const fetchedProducts = JSON.parse(response.data.data);
        products.remove({});
        const validationContext = productSchema.newContext();
        fetchedProducts.forEach((fetchedProduct) => {
          const product = fetchedProduct;
          product.externalProductId = product.productId;
          if (recommendedProductIds.indexOf(product.variationId) > -1) {
            product.display = false;
          }
          productSchema.clean(product);
          if (validationContext.validate(product)) {
            products.insert(product);
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
