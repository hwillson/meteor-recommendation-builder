/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Random } from 'meteor/random';
import { Factory } from 'meteor/factory';
import { _ } from 'meteor/underscore';
import { PublicationCollector } from 'meteor/publication-collector';
import { chai } from 'meteor/practicalmeteor:chai';
import faker from 'faker';

import products from '../collection.js';

import './publications.js';

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
        Factory.create('product');
      });
    });

    afterEach(function () {
      products.remove({});
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('products.all', (collections) => {
        chai.expect(collections).to.be.empty;
        done();
      });
    });

    it('should publish all products if logged in', function (done) {
      const collector = new PublicationCollector({ userId });
      collector.collect('products.all', (collections) => {
        chai.expect(collections.products.length).to.equal(3);
        done();
      });
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
        Factory.create('product');
      });
      Factory.create('product', { display: false });
    });

    afterEach(function () {
      products.remove({});
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('products.notRecommended', (collections) => {
        chai.expect(collections).to.be.empty;
        done();
      });
    });

    it(
      'should publish all products with display true if logged in',
      function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('products.notRecommended', (collections) => {
          chai.expect(collections.products.length).to.equal(3);
          done();
        });
      }
    );
  });
});
