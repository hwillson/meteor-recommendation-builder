/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Random } from 'meteor/random';
import { Factory } from 'meteor/factory';
import { _ } from 'meteor/underscore';
import { PublicationCollector } from 'meteor/publication-collector';
import { chai } from 'meteor/practicalmeteor:chai';
import faker from 'faker';

import recommendedProducts from '../collection.js';

import './publications.js';

const userId = Random.id();

describe('api.recommended_products.server.publications', function () {
  describe('recommendedProduct.all', function () {
    beforeEach(function () {
      Factory.define('recommendedProduct', recommendedProducts, {
        productId: faker.lorem.word(),
        productName: faker.random.words(),
        variationName: faker.random.words(),
      });
      _.times(3, () => {
        Factory.create('recommendedProduct');
      });
    });

    afterEach(function () {
      recommendedProducts.remove({});
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('recommendedProducts.all', (collections) => {
        chai.expect(collections).to.be.empty;
        done();
      });
    });

    it('should publish all products if logged in', function (done) {
      const collector = new PublicationCollector({ userId });
      collector.collect('recommendedProducts.all', (collections) => {
        chai.expect(collections.recommended_products.length).to.equal(3);
        done();
      });
    });
  });
});
