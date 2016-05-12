/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import faker from 'faker';
import { expect } from 'chai';
const fiber = require('fibers');

import {
  Random,
  Factory,
  _,
  PublicationCollector,
} from '../../../../src/imports/utility/meteor/packages';

import products from '../../../../src/imports/api/products/collection';

import '../../../../src/imports/api/products/server/publications.js';

const userId = Random.id();

describe('api.products.server.publications', function () {
  describe('products.all', function () {
    beforeEach(function () {
      Factory.define('product', products, {
        externalProductId: faker.random.number(),
        productName: faker.random.words(),
        productUrl: faker.internet.url(),
        productImage: faker.image.imageUrl(),
        variationId: faker.random.number(),
        variationName: faker.random.words(),
        status: faker.random.word(),
      });
      _.times(3, () => {
        fiber(() => {
          Factory.create('product');
        }).run();
      });
    });

    afterEach(function () {
      fiber(() => {
        products.remove({});
      }).run();
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('products.all', (collections) => {
        expect(collections).to.be.empty;
        done();
      });
    });

    it('should publish all products if logged in', function () {
      const collector = new PublicationCollector({ userId });
      fiber(() => {
        collector.collect('products.all', (collections) => {
          expect(collections.products.length).to.equal(3);
        });
      }).run();
    });
  });

  describe('products.notRecommended', function () {
    beforeEach(function () {
      Factory.define('product', products, {
        externalProductId: faker.random.number(),
        productName: faker.random.words(),
        productUrl: faker.internet.url(),
        productImage: faker.image.imageUrl(),
        variationId: faker.random.number(),
        variationName: faker.random.words(),
        status: faker.random.word(),
        display: true,
      });
      _.times(3, () => {
        fiber(() => {
          Factory.create('product');
        }).run();
      });
      fiber(() => {
        Factory.create('product', { display: false });
      }).run();
    });

    afterEach(function () {
      fiber(() => {
        products.remove({});
      }).run();
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('products.notRecommended', (collections) => {
        expect(collections).to.be.empty;
        done();
      });
    });

    it(
      'should publish all products with display true if logged in',
      function () {
        const collector = new PublicationCollector({ userId });
        fiber(() => {
          collector.collect('products.notRecommended', (collections) => {
            expect(collections.products.length).to.equal(3);
          });
        }).run();
      }
    );
  });
});
