/* global Package */
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import td from 'testdouble';

import products from '../../../../src/imports/api/products/collection.js';

const imports = '../../../../src/imports';

const validHttpGetResponse = () => {
  const responseData = [
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 456,
      variationName: 'Test Variation 1',
      status: 'active',
    },
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 789,
      variationName: 'Test Variation 2',
      status: 'active',
    },
  ];
  const response = {
    data: {
      success: true,
      data: JSON.stringify(responseData),
    },
  };
  return response;
};

const validHttpGetResponseWithInvalidProducts = () => {
  const responseData = [
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      productImage: 'http://blah.com/some-image',
      variationId: 456,
      variationName: 'Test Variation 1',
      status: 'active',
    },
    {
      productId: 123,
      productName: 'Test Product 1',
      productUrl: 'http://blah.com/some-product',
      variationName: 'Test Variation 2',
    },
  ];
  const response = {
    data: {
      success: true,
      data: JSON.stringify(responseData),
    },
  };
  return response;
};

function getProductSynch() {
  return require(
    `${imports}/api/products/server/product_synch.js`
  ).ProductSynch;
}

const Meteor = {
  settings: {
    private: {
      productSynch: {
        sourceUrl: 'blah.com',
      },
    },
  },
};

describe('api.products.server.productSynch', function () {
  describe('run', function () {
    afterEach(function () {
      td.reset();
      const resolved = require.resolve(
        `${__dirname}/${imports}/api/products/server/product_synch.js`
      );
      delete require.cache[resolved];
    });

    it(
      'should return false on missing response failed synch',
      function () {
        const HTTP = {
          get() {
            return undefined;
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        const synchStatus = getProductSynch().run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if missing response data',
      function () {
        const HTTP = {
          get() {
            return {
              data: null,
            };
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        const synchStatus = getProductSynch().run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if missing product data',
      function () {
        const HTTP = {
          get() {
            return {
              data: {
                data: null,
              },
            };
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        const synchStatus = getProductSynch().run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return false if product web service success flag is false',
      function () {
        const HTTP = {
          get() {
            return {
              data: {
                success: false,
              },
            };
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        const synchStatus = getProductSynch().run();
        expect(synchStatus.success).to.equal(false);
      }
    );

    it(
      'should return true if product data exists and product success flag is '
      + 'true',
      function () {
        const HTTP = {
          get() {
            return validHttpGetResponse();
          },
        };
        const recommendedProducts = {
          find() {
            return [];
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        td.replace(
          `${imports}/api/recommended_products/collection.js`,
          recommendedProducts
        );
        td.replace(products, 'insert');
        td.replace(products, 'remove');
        const synchStatus = getProductSynch().run();
        expect(synchStatus.success).to.equal(true);
      }
    );

    it(
      'should remove products before adding them again',
      function () {
        const HTTP = {
          get() {
            return validHttpGetResponse();
          },
        };
        const recommendedProducts = {
          find() {
            return [];
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        td.replace(
          `${imports}/api/recommended_products/collection.js`,
          recommendedProducts
        );
        td.replace(products, 'remove');
        td.replace(products, 'insert');
        getProductSynch().run();
        td.verify(products.remove({}));
      }
    );

    it('should insert fetched products', function () {
      const HTTP = {
        get() {
          return validHttpGetResponse();
        },
      };
      const recommendedProducts = {
        find() {
          return [];
        },
      };
      td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
      td.replace(
        `${imports}/api/recommended_products/collection.js`,
        recommendedProducts
      );
      td.replace(products, 'remove');
      td.replace(products, 'insert');
      const synchStatus = getProductSynch().run();
      expect(synchStatus.fetchedProductCount).to.equal(2);
    });

    it('should ignore invalid products', function () {
      const HTTP = {
        get() {
          return validHttpGetResponseWithInvalidProducts();
        },
      };
      const recommendedProducts = {
        find() {
          return [];
        },
      };
      td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
      td.replace(
        `${imports}/api/recommended_products/collection.js`,
        recommendedProducts
      );
      td.replace(products, 'remove');
      td.replace(products, 'insert');
      const synchStatus = getProductSynch().run();
      expect(synchStatus.fetchedProductCount).to.equal(1);
    });

    it(
      'should set display to false if product is a recommended product',
      function () {
        const HTTP = {
          get() {
            return validHttpGetResponse();
          },
        };
        const recommendedProducts = {
          find() {
            return [{ variationId: 789 }];
          },
        };
        td.replace(`${imports}/utility/meteor/packages`, { Meteor, HTTP });
        td.replace(
          `${imports}/api/recommended_products/collection.js`,
          recommendedProducts
        );
        td.replace(products, 'remove');
        td.replace(products, 'insert');
        getProductSynch().run();
        td.verify(products.insert({
          productName: 'Test Product 1',
          productUrl: 'http://blah.com/some-product',
          productImage: 'http://blah.com/some-image',
          variationId: 789,
          variationName: 'Test Variation 2',
          status: 'active',
          externalProductId: 123,
          display: false,
        }));
      }
    );
  });
});
