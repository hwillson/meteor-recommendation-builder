import { Meteor } from '../../utility/meteor/packages';

import questions from '../../api/questions/collection';

if (Meteor.settings.private.seedDatabase) {
  if (questions.find().count() === 0) {
    // Car types
    questions.insert({
      label: 'type',
      question: 'I like to drive',
      help: '(Select all that apply)',
      summary: 'I like to drive',
      order: 1,
      mandatory: true,
      maxAnswersAllowed: 4,
      matchKey: 'types.name',
      matchExclusion: false,
      availableAnswers: [
        { answerId: 'micro', answer: 'Micro Cars' },
        { answerId: 'sports', answer: 'Sports Cars' },
        { answerId: 'peopleHauler', answer: 'People Haulers' },
        { answerId: 'collector', answer: 'Collector Cars' },
        { answerId: 'lame', answer: 'Lame Cars' },
      ],
    });

    // Family size
    questions.insert({
      label: 'count',
      question: "I'll be hauling around:",
      summary: "I'm hauling around",
      order: 2,
      mandatory: true,
      maxAnswersAllowed: 1,
      availableAnswers: [
        { answerId: '1', answer: '1 person' },
        { answerId: '2', answer: '2 people' },
        { answerId: '3', answer: '3 people' },
        { answerId: '4', answer: '4 people' },
        { answerId: '5+', answer: '5 or more people' },
      ],
    });

    // Colours
    questions.insert({
      label: 'colour',
      question: 'I love the following car colours:',
      help: '(Select 1 colour)',
      summary: 'I love cars coloured',
      order: 3,
      mandatory: true,
      maxAnswersAllowed: 1,
      matchKey: 'colours.name',
      matchExclusion: false,
      availableAnswers: [
        { answerId: 'red', answer: 'Red' },
        { answerId: 'black', answer: 'Black' },
        { answerId: 'blue', answer: 'Blue' },
        { answerId: 'green', answer: 'Green' },
      ],
    });

    // Make dislikes
    questions.insert({
      label: 'make',
      question: "I don't like:",
      help: '(Select up to 2 makes)',
      summary: "I don't like cars made by",
      order: 4,
      mandatory: false,
      maxAnswersAllowed: 2,
      matchKey: 'make',
      matchExclusion: true,
      availableAnswers: [
        { answerId: 'ford', answer: 'Ford' },
        { answerId: 'honda', answer: 'Honda' },
        { answerId: 'mercedes', answer: 'Mercedes' },
        { answerId: 'kia', answer: 'Kia' },
        { answerId: 'bmw', answer: 'BMW' },
        { answerId: 'porsche', answer: 'Porsche' },
      ],
    });
  }
}
