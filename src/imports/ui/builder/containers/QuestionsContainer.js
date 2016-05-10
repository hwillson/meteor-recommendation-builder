import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import QuestionsList from '../components/questions/QuestionsList.js';
import questions from '/imports/api/questions/collection.js';

export default createContainer(() => {
  const questionsHandle = Meteor.subscribe('questions.all');
  const loading = !questionsHandle.ready();
  const loadedQuestions = questions.find().fetch();
  const questionsExist =
    !loading && loadedQuestions && (loadedQuestions.length > 0);
  return {
    loading,
    questions: loadedQuestions,
    questionsExist,
  };
}, QuestionsList);
