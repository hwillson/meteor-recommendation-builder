import { Meteor, createContainer } from '../../../utility/meteor/packages';

import QuestionsList from '../components/questions/QuestionsList';
import questions from '../../../api/questions/collection';

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
