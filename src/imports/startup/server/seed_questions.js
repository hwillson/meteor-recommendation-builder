import faker from 'faker';
import { Meteor, _ } from '../../utility/meteor/packages';

import questions from '../../api/questions/collection';

if (Meteor.settings.private.seedDatabase) {
  if (questions.find().count() === 0) {
    _.times(5, () => {
      const availableAnswers = [];
      _.times(5, () => {
        availableAnswers.push({
          answerId: faker.random.word(),
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
        mandatory: true,
        maxAnswersAllowed: 1,
        matchKey: faker.lorem.word(),
        matchExclusion: faker.random.boolean(),
        availableAnswers,
      });
    });
  }
}
