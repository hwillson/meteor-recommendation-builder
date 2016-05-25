import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import WizardAnswer from './WizardAnswer';
import { addAnswer, removeAnswer } from '../../../../api/customer_sessions/methods';

export const EventHandlers = {
  answerClicked({
      currentAnswerCount, maxAnswersAllowed, sessionId, questionId, answerId,
      isSelected }) {
    let maxAnswersReached;
    if (maxAnswersAllowed && sessionId && questionId && answerId) {
      if (isSelected && (currentAnswerCount === maxAnswersAllowed)) {
        maxAnswersReached = true;
      } else {
        const updateAnswerMethod = (isSelected) ? addAnswer : removeAnswer;
        updateAnswerMethod.call({ sessionId, questionId, answerId });
        maxAnswersReached = false;
      }
    } else {
      throw new Error('Missing answerClicked parameters.');
    }
    return maxAnswersReached;
  },
};

class WizardQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.state = {
      maxAnswersReached: false,
    };
  }

  getSelectedAnswerCount() {
    let answerCount = 0;
    const allAnswers = this.props.customerSession.answers;
    if (allAnswers[this.props.question._id]) {
      answerCount = allAnswers[this.props.question._id].length;
    }
    return answerCount;
  }

  handleAnswerSelected(answerId, isSelected) {
    const maxAnswersReached = EventHandlers.answerClicked({
      currentAnswerCount: this.getSelectedAnswerCount(),
      maxAnswersAllowed: this.props.question.maxAnswersAllowed,
      sessionId: this.props.customerSession._id,
      questionId: this.props.question._id,
      answerId,
      isSelected,
    });
    if (maxAnswersReached) {
      this.setState({
        maxAnswersReached,
      });
    }
  }

  renderMaxAnswersReached() {
    let content;
    if (this.state.maxAnswersReached) {
      setTimeout(() => {
        this.setState({
          maxAnswersReached: false,
        });
      }, 5000);
      content = (
        <Alert bsStyle="danger" className="wizard-max-answers">
          You've already selected the maximum number of answers.
        </Alert>
      );
    }
    return content;
  }

  renderAnswers() {
    const content = this.props.question.availableAnswers.map((answer) => {
      const selectedAnswers = this.props.customerSession.answers;
      let selected = false;
      if (selectedAnswers && selectedAnswers[this.props.question._id]) {
        if (selectedAnswers[this.props.question._id].indexOf(answer.answerId) > -1) {
          selected = true;
        }
      }
      return (
        <WizardAnswer
          key={answer.answerId} answer={answer}
          onAnswerSelected={this.handleAnswerSelected} selected={selected}
        />
      );
    });
    return content;
  }

  render() {
    return (
      <div className="wizard-question">
        <h1 className="wizard-question-title">
          {this.props.question.question}
        </h1>
        <h2 className="wizard-question-help">
          {this.props.question.help}
        </h2>
        {this.renderMaxAnswersReached()}
        {this.renderAnswers()}
      </div>
    );
  }
}

WizardQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export { WizardQuestion };
