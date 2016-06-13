import { Meteor } from '../../utility/meteor/packages';

import questions from '../../api/questions/collection';
import experts from '../../api/experts/collection';

if (Meteor.settings.private.seedDatabase) {
  // Questions
  if (questions.find().count() === 0) {
    // Car types
    questions.insert({
      label: 'select type',
      question: 'I like to drive',
      help: '(Select up to 4 categories)',
      summary: 'I like to drive',
      order: 1,
      mandatory: true,
      maxAnswersAllowed: 4,
      matchKey: 'taxonomy.types',
      matchExclusion: false,
      availableAnswers: [
        {
          answerId: 'micro',
          answer: 'Micro Cars',
          imagePath: '/images/questions/placeholder.png',
        },
        {
          answerId: 'sports',
          answer: 'Sports Cars',
          imagePath: '/images/questions/placeholder.png',
        },
        {
          answerId: 'peopleHauler',
          answer: 'People Haulers',
          imagePath: '/images/questions/placeholder.png',
        },
        {
          answerId: 'collector',
          answer: 'Collector Cars',
          imagePath: '/images/questions/placeholder.png',
        },
        {
          answerId: 'lame',
          answer: 'Lame Cars',
          imagePath: '/images/questions/placeholder.png',
        },
      ],
    });

    // Family size
    questions.insert({
      label: 'select count',
      question: "I'll be hauling around:",
      help: '(Select 1 answer)',
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
      label: 'select colour',
      question: 'I love the following car colours:',
      help: '(Select 1 colour)',
      summary: 'I love cars coloured',
      order: 3,
      mandatory: true,
      maxAnswersAllowed: 1,
      matchKey: 'taxonomy.colours',
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
      label: 'select make',
      question: "I don't like:",
      help: '(Select up to 2 makes)',
      summary: "I don't like cars made by",
      order: 4,
      mandatory: false,
      maxAnswersAllowed: 2,
      matchKey: 'taxonomy.make',
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

    // Driving feelings
    questions.insert({
      label: 'enter feelings',
      question: 'Driving makes me feel:',
      summary: 'Driving makes me feel',
      order: 5,
      mandatory: false,
    });
  }

  // Experts
  if (experts.find().count() === 0) {
    experts.insert({
      firstName: 'Jack',
      lastName: 'Jones',
      title: 'Auto Awesome Guy',
      email: 'jackjones@autoawesome.car',
      phone: '1-800-123-4567',
      imageUrl: '/images/expert/expert_placeholder.png',
      chatLink: '#',
      welcomeMessage:
        "I'm your car expert here at Awesome Auto. I helped hand pick some "
        + 'of our best cars below.',
      overviewMessage:
        "We've put together a few custom recommendations below, based on "
        + 'your awesome answers. Have any questions with the cars listed '
        + "below? Reach out to me anytime - I'm here to help!",
      sidebarMessage:
        "Aloha! Looks like I'm your expert! Great news - I can definitely "
        + 'help you give me money! Haha - just kidding, but seriously; '
        + 'I can help (and want your money!).',
      twitter: 'https://twitter.com/twitter',
      facebook: 'https://www.facebook.com/facebook',
      randomSeed: Math.random(),
    });

    experts.insert({
      firstName: 'Rick',
      lastName: 'James',
      title: 'Lead Auto Awesome Overlord',
      email: 'rickjames@autoawesome.car',
      phone: '1-800-123-4567',
      imageUrl: '/images/expert/expert_placeholder.png',
      chatLink: '#',
      welcomeMessage:
        "I'm in charge around here at Awesome Auto, so I know what's up. "
        + 'I helped my minions get together a few recommendations for you.',
      overviewMessage:
        "Normally I don't get involved with these sorts of things, but "
        + 'I can tell I like you already. Check out our recommendations '
        + 'and give me a shout anytime to discuss how we can take your '
        + 'money. Haha, just kidding - bit of a dealer joke there.',
      sidebarMessage:
        'Awesome - looks like our friendly robots have paired us up! '
        + "Hey, I'm here to help - so ping me anytime. Keep going through the "
        + "builder and let's get you some awesome products!",
      twitter: 'https://twitter.com/twitter',
      facebook: 'https://www.facebook.com/facebook',
      randomSeed: Math.random(),
    });
  }
}
