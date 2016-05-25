import { Meteor, createContainer } from '../../../utility/meteor/packages';

import BuilderLayout from '../layouts/BuilderLayout';
import questions from '../../../api/questions/collection';
import customerSessions from '../../../api/customer_sessions/collection';
import { createCustomerSession } from '../../../api/customer_sessions/methods';

function getSessionId() {
  let sessionId = localStorage.getItem('builder_customer_session_id');
  if (!sessionId) {
    sessionId = createCustomerSession.call({ answers: {} });
    localStorage.setItem('builder_customer_session_id', sessionId);
  }
  return sessionId;
}

function clearSession() {
  localStorage.removeItem('builder_customer_session_id');
  window.location.reload();
}

export const BuilderContainer = createContainer(() => {
  const questionsHandle = Meteor.subscribe('questions.all');
  let loadedQuestions = [];
  if (questionsHandle.ready()) {
    loadedQuestions = questions.find({}, {
      sort: {
        order: 1,
      },
    }).fetch();
  }

  const customerSessionHandle =
    Meteor.subscribe('customerSessions.single', getSessionId());
  let customerSession;
  if (customerSessionHandle.ready()) {
    if (customerSessions.findOne()) {
      customerSession = customerSessions.findOne();
    } else {
      clearSession();
    }
  }

  return {
    questions: loadedQuestions,
    customerSession,
  };
}, BuilderLayout);
