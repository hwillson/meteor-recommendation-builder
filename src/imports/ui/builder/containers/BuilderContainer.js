/* global localStorage, window */

import {
  Meteor,
  createContainer,
  Session,
} from '../../../utility/meteor/packages';

import BuilderLayout from '../layouts/BuilderLayout';
import questions from '../../../api/questions/collection';
import customerSessions from '../../../api/customer_sessions/collection';
import experts from '../../../api/experts/collection';
import { createCustomerSession } from '../../../api/customer_sessions/methods';
import assignRandomExpert from '../../../api/experts/methods';

function getSessionId() {
  let sessionId = localStorage.getItem('builder_customer_session_id');
  if (!sessionId) {
    sessionId = createCustomerSession.call({ answers: {} });
    localStorage.setItem('builder_customer_session_id', sessionId);
    assignRandomExpert.call({ sessionId });
  }
  return sessionId;
}

function clearSession() {
  localStorage.removeItem('builder_customer_session_id');
  window.location.reload();
}

const BuilderContainer = createContainer(() => {
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
  let expert;
  if (customerSessionHandle.ready()) {
    if (customerSessions.findOne()) {
      customerSession = customerSessions.findOne();
      Meteor.subscribe('experts.single', customerSession.expertId);
      expert = experts.findOne();
    } else {
      clearSession();
    }
  }

  const showProcessingOverlay = Session.get('showProcessingOverlay');

  return {
    questions: loadedQuestions,
    customerSession,
    showProcessingOverlay,
    expert,
  };
}, BuilderLayout);

export default BuilderContainer;
