/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { HTTP } from 'meteor/http';

import productSynch from './product_synch.js';
import products from '../collection.js';
import recommendedProducts from '../../recommended_products/collection.js';

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

describe('api.products.server.productSynch', function () {
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
          return validHttpGetResponse();
        });
        this.stub(products, 'insert');
        const synchStatus = productSynch.run();
        chai.expect(synchStatus.success).to.equal(true);
      })
    );

    it(
      'should remove products before adding them again',
      sinon.test(function () {
        this.stub(HTTP, 'get', function () {
          return validHttpGetResponse();
        });
        const removeStub = this.stub(products, 'remove');
        productSynch.run();
        chai.expect(removeStub.callCount).to.equal(1);
      })
    );

    it('should insert fetched products', sinon.test(function () {
      this.stub(HTTP, 'get', function () {
        return validHttpGetResponse();
      });
      this.stub(products, 'insert');
      const synchStatus = productSynch.run();
      chai.expect(synchStatus.fetchedProductCount).to.equal(2);
    }));

    it('should ignore invalid products', sinon.test(function () {
      this.stub(HTTP, 'get', function () {
        return validHttpGetResponseWithInvalidProducts();
      });
      this.stub(products, 'insert');
      const synchStatus = productSynch.run();
      chai.expect(synchStatus.fetchedProductCount).to.equal(1);
    }));

    it(
      'should set display to false if product is a recommended product',
      sinon.test(function () {
        this.stub(HTTP, 'get', function () {
          return validHttpGetResponse();
        });
        this.stub(recommendedProducts, 'find', function () {
          return [{ variationId: 789 }];
        });
        const insertStub = this.stub(products, 'insert');
        productSynch.run();
        chai.expect(insertStub.getCall(0).args[0].display).to.be.true;
        chai.expect(insertStub.getCall(1).args[0].display).to.be.false;
      })
    );
  });
});
