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

describe('api.products.server.publications', function () {
  const userId = Random.id();

  before(function () {
    Factory.define('product', products, {
      productId: faker.random.number(),
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

  describe('products.all', function () {
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
});
