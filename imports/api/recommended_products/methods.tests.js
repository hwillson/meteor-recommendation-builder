/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import {
  addRecommendedProduct,
  removeRecommendedProduct,
  updateGender,
  updateSports,
  updateHours,
} from './methods.js';
import recommendedProducts from './collection.js';
import products from '../products/collection.js';

const expect = chai.expect;

describe('api.recommended_products.methods', function () {
  describe('addRecommendedProduct', function () {
    it(
      'should be registered',
      sinon.test(function () {
        expect(addRecommendedProduct).to.be.defined;
        expect(addRecommendedProduct instanceof ValidatedMethod).to.be.true;
      })
    );

    it('should throw exception if input is invalid', function () {
      expect(() => addRecommendedProduct.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        this.stub(recommendedProducts, 'insert');
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        expect(() => addRecommendedProduct.call(recommendedProduct)).to.throw(
          Error
        );
      })
    );

    it(
      'should throw an exception if trying to add a recommended product that '
      + 'already exists',
      sinon.test(function () {
        this.stub(recommendedProducts, 'findOne', () => true);
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        expect(() => {
          addRecommendedProduct._execute(
            { userId: 'abc123' },
            recommendedProduct
          );
        }).to.throw(Error);
      })
    );

    it(
      'should add a recommended product if logged in',
      sinon.test(function () {
        const insertStub = this.stub(recommendedProducts, 'insert');
        this.stub(products, 'update');
        const recommendedProduct = {
          productName: 'Test Product',
          variationName: 'Test Variation',
          variationId: 123,
          productImage: '/some/path/img.png',
        };
        addRecommendedProduct._execute(
          { userId: 'abc123' },
          recommendedProduct
        );
        expect(insertStub.callCount).to.equal(1);
      })
    );

    if (Meteor.isServer) {
      it(
        'should set display for associated product to false so it does not show '
        + 'in the available products modal',
        sinon.test(function () {
          this.stub(recommendedProducts, 'insert');
          const updateStub = this.stub(products, 'update');
          const recommendedProduct = {
            productName: 'Test Product',
            variationName: 'Test Variation',
            variationId: 123,
            productImage: '/some/path/img.png',
          };
          addRecommendedProduct._execute(
            { userId: 'abc123' },
            recommendedProduct
          );
          expect(updateStub.callCount).to.equal(1);
        })
      );
    }
  });

  describe('removeRecommendedProduct', function () {
    it(
      'should be registered',
      sinon.test(function () {
        expect(removeRecommendedProduct).to.be.defined;
        expect(removeRecommendedProduct instanceof ValidatedMethod).to.be.true;
      })
    );

    it('should throw exception if input is invalid', function () {
      expect(() => removeRecommendedProduct.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        this.stub(recommendedProducts, 'remove');
        const params = {
          _id: 'abc123',
          variationId: 123,
        };
        expect(() => removeRecommendedProduct.call(params)).to.throw(
          Error
        );
      })
    );

    it(
      'should remove recommended product if logged in',
      sinon.test(function () {
        const removeStub = this.stub(recommendedProducts, 'remove');
        this.stub(products, 'update');
        const params = {
          _id: 'abc123',
          variationId: 123,
        };
        removeRecommendedProduct._execute(
          { userId: 'abc123' },
          params
        );
        expect(removeStub.callCount).to.equal(1);
      })
    );

    if (Meteor.isServer) {
      it(
        'should set display for associated product to true so it shows '
        + 'in the available products modal',
        sinon.test(function () {
          this.stub(recommendedProducts, 'remove');
          const updateStub = this.stub(products, 'update');
          const params = {
            _id: 'abc123',
            variationId: 123,
          };
          removeRecommendedProduct._execute(
            { userId: 'abc123' },
            params
          );
          expect(updateStub.callCount).to.equal(1);
        })
      );
    }
  });

  describe('updateGender', function () {
    it(
      'should be registered',
      sinon.test(function () {
        expect(updateGender).to.be.defined;
        expect(updateGender instanceof ValidatedMethod).to.be.true;
      })
    );

    it('should throw exception if input is invalid', function () {
      expect(() => updateGender.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          gender: ['M'],
        };
        expect(() => updateGender.call(recommendedProduct)).to.throw(
          Error
        );
      })
    );

    it(
      'should update recommended product if logged in',
      sinon.test(function () {
        const updateStub = this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          gender: ['M'],
        };
        updateGender._execute(
          { userId: 'abc123' },
          recommendedProduct
        );
        expect(updateStub.callCount).to.equal(1);
      })
    );
  });

  describe('updateSports', function () {
    it(
      'should be registered',
      sinon.test(function () {
        expect(updateSports).to.be.defined;
        expect(updateSports instanceof ValidatedMethod).to.be.true;
      })
    );

    it('should throw exception if input is invalid', function () {
      expect(() => updateSports.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          sports: ['cycling'],
        };
        expect(() => updateSports.call(recommendedProduct)).to.throw(
          Error
        );
      })
    );

    it(
      'should update recommended product if logged in',
      sinon.test(function () {
        const updateStub = this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          sports: ['cycling'],
        };
        updateSports._execute(
          { userId: 'abc123' },
          recommendedProduct
        );
        expect(updateStub.callCount).to.equal(1);
      })
    );
  });

  describe('updateHours', function () {
    it(
      'should be registered',
      sinon.test(function () {
        expect(updateHours).to.be.defined;
        expect(updateHours instanceof ValidatedMethod).to.be.true;
      })
    );

    it('should throw exception if input is invalid', function () {
      expect(() => updateHours.call({})).to.throw(Error);
    });

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          hours: ['5-10'],
        };
        expect(() => updateHours.call(recommendedProduct)).to.throw(
          Error
        );
      })
    );

    it(
      'should update recommended product if logged in',
      sinon.test(function () {
        const updateStub = this.stub(recommendedProducts, 'update');
        const recommendedProduct = {
          _id: 'abc123',
          hours: ['5-10'],
        };
        updateHours._execute(
          { userId: 'abc123' },
          recommendedProduct
        );
        expect(updateStub.callCount).to.equal(1);
      })
    );
  });
});
