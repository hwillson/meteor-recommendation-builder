/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import faker from 'faker';
import { expect } from 'chai';
const fiber = require('fibers');

import { Random } from '../../../../src/imports/utility/meteor/random';
import { Factory } from '../../../../src/imports/utility/meteor/factory';
import { _ } from '../../../../src/imports/utility/meteor/underscore';
import { PublicationCollector } from '../../../../src/imports/utility/meteor/publication_collector';
import recommendedProducts from '../../../../src/imports/api/recommended_products/collection';

import '../../../../src/imports/api/recommended_products/server/publications.js';

const userId = Random.id();

describe('api.recommended_products.server.publications', function () {
  describe('recommendedProducts.all', function () {
    beforeEach(function () {
      Factory.define('recommendedProduct', recommendedProducts, {
        variationId: faker.random.number(),
        productName: faker.random.words(),
        variationName: faker.random.words(),
        productImage: faker.system.commonFileName(),
      });
      _.times(3, () => {
        fiber(() => {
          Factory.create('recommendedProduct');
        }).run();
      });
    });

    afterEach(function () {
      fiber(() => {
        recommendedProducts.remove({});
      }).run();
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('recommendedProducts.all', (collections) => {
        expect(collections).to.be.empty;
        done();
      });
    });

    it('should publish all products if logged in', function () {
      const collector = new PublicationCollector({ userId });
      fiber(() => {
        collector.collect('recommendedProducts.all', (collections) => {
          expect(collections.recommended_products.length).to.equal(3);
        });
      }).run();
    });
  });
});
