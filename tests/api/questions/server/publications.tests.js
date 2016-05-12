/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import faker from 'faker';
import { expect } from 'chai';
const fiber = require('fibers');

import { Factory } from '../../../../src/imports/utility/meteor/factory';
import { _ } from '../../../../src/imports/utility/meteor/underscore';
import { PublicationCollector } from '../../../../src/imports/utility/meteor/publication_collector';
import questions from '../../../../src/imports/api/questions/collection';

import '../../../../src/imports/api/questions/server/publications.js';

describe('api.questions.server.publications', function () {
  describe('questions.all', function () {
    beforeEach(function () {
      Factory.define('question', questions, {
        label: faker.random.word(),
        content: faker.random.words(),
        order: faker.random.number(),
        availableAnswers: [],
      });
      _.times(3, () => {
        fiber(() => {
          Factory.create('question');
        }).run();
      });
    });

    afterEach(function () {
      fiber(() => {
        questions.remove({});
      }).run();
    });

    it('should publish all questions', function () {
      const collector = new PublicationCollector();
      fiber(() => {
        collector.collect('questions.all', (collections) => {
          expect(collections.questions.length).to.equal(3);
        });
      }).run();
    });
  });
});
