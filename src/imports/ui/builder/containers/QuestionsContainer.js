import { Meteor, createContainer } from '../../../utility/meteor/packages';

import QuestionsPage from '../pages/QuestionsPage';
import questions from '../../../api/questions/collection';
import customerSessions from '../../../api/customer_sessions/collection';
import {
  createCustomerSession,
} from '../../../api/customer_sessions/methods';

function getSessionId() {
  let sessionId = localStorage.getItem('builder_customer_session_id');
  if (!sessionId) {
    sessionId = createCustomerSession.call({ answers: {} });
    localStorage.setItem('builder_customer_session_id', sessionId);
  }
  return sessionId;
}

export const QuestionsContainer = createContainer(() => {
  const questionsHandle = Meteor.subscribe('questions.all');
  const loading = !questionsHandle.ready();
  const loadedQuestions = questions.find({}, {
    sort: {
      order: 1
    }
  }).fetch();
  const questionsExist =
    !loading && loadedQuestions && (loadedQuestions.length > 0);

  const customerSessionHandle =
    Meteor.subscribe('customerSessions.single', getSessionId());
  let customerSession;
  if (customerSessionHandle.ready()) {
    customerSession = customerSessions.findOne();
  } else {
    customerSession = {
      answers: {}
    };
  }

  return {
    loading,
    questions: loadedQuestions,
    questionsExist,
    customerSession,
  };
}, QuestionsPage);
