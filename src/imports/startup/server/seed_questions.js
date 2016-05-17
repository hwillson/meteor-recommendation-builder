import faker from 'faker';
import { _ } from 'underscore';

import questions from '/imports/api/questions/collection.js';

if (questions.find().count() === 0) {
  _.times(5, () => {
    const availableAnswers = [];
    _.times(5, () => {
      availableAnswers.push({
        answerId: faker.random.number(),
        answer: faker.lorem.words(),
        imagePath: '/images/placeholder.png',
      });
    });
    questions.insert({
      label: faker.lorem.word(),
      question: faker.lorem.sentence(),
      summary: faker.lorem.sentence(),
      help: faker.lorem.sentence(),
      order: faker.random.number(),
      maxAnswersAllowed: 1,
      availableAnswers,
    });
  });
}
