/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Random } from 'meteor/random';
import { Factory } from 'meteor/factory';
import { _ } from 'meteor/underscore';
import { PublicationCollector } from 'meteor/publication-collector';
import { chai } from 'meteor/practicalmeteor:chai';
import faker from 'faker';

import questions from '../collection.js';

import './publications.js';

const userId = Random.id();

describe('api.questions.server.publications', function () {
  describe('questions.all', function () {
    beforeEach(function () {
      Factory.define('question', questions, {
        questionId: faker.random.word(),
        label: faker.random.word(),
        content: faker.random.words(),
        order: faker.random.number(),
        availableAnswers: [],
      });
      _.times(3, () => {
        Factory.create('question');
      });
    });

    afterEach(function () {
      questions.remove({});
    });

    it('should not publish any products if not logged in', function (done) {
      const collector = new PublicationCollector();
      collector.collect('questions.all', (collections) => {
        chai.expect(collections).to.be.empty;
        done();
      });
    });

    it('should publish all products if logged in', function (done) {
      const collector = new PublicationCollector({ userId });
      collector.collect('questions.all', (collections) => {
        chai.expect(collections.questions.length).to.equal(3);
        done();
      });
    });
  });
});
