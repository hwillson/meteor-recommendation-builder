/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { HTTP } from 'meteor/http';

import productSynch from './product_synch.js';
import products from '../collection.js';

describe('api.products.server', function () {
  describe('productSynch', function () {
    describe('run', function () {
      it(
        'should return false on missing response failed synch',
        sinon.test(function () {
          this.stub(HTTP, 'get', function () {
            return undefined;
          });
          const synchStatus = productSynch.run();
          chai.expect(synchStatus.success).to.equal(false);
        })
      );

      it(
        'should return false if missing response data',
        sinon.test(function () {
          this.stub(HTTP, 'get', function () {
            return {
              data: null,
            };
          });
          const synchStatus = productSynch.run();
          chai.expect(synchStatus.success).to.equal(false);
        })
      );

      it(
        'should return false if missing product data',
        sinon.test(function () {
          this.stub(HTTP, 'get', function () {
            return {
              data: {
                data: null,
              },
            };
          });
          const synchStatus = productSynch.run();
          chai.expect(synchStatus.success).to.equal(false);
        })
      );

      it(
        'should return false if product web service success flag is false',
        sinon.test(function () {
          this.stub(HTTP, 'get', function () {
            return {
              data: {
                success: false,
              },
            };
          });
          const synchStatus = productSynch.run();
          chai.expect(synchStatus.success).to.equal(false);
        })
      );

      it(
        'should return true if product data exists and product success flag is '
        + 'true',
        sinon.test(function () {
          this.stub(HTTP, 'get', function () {
            return {
              data: {
                success: true,
                data: '["blah"]',
              },
            };
          });
          this.stub(products, 'insert');
          const synchStatus = productSynch.run();
          chai.expect(synchStatus.success).to.equal(true);
        })
      );

      it('should insert fetched products', sinon.test(function () {
        this.stub(HTTP, 'get', function () {
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
        });
        this.stub(products, 'insert');
        const synchStatus = productSynch.run();
        chai.expect(synchStatus.fetchedProductCount).to.equal(2);
      }));
    });
  });
});
