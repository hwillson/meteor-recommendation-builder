import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { _ } from '../../../../utility/meteor/packages';

import {
  updateFreeTextAnswer,
} from '../../../../api/customer_sessions/methods';

class WizardFreeTextAnswer extends Component {
  constructor(props) {
    super(props);

    this.updateAnswerDebounced = _.debounce(
      ({ sessionId, questionId, answer }) => {
console.log('saving');
        updateFreeTextAnswer.call({ sessionId, questionId, answer });
      },
      500
    );

    this.updateAnswer = this.updateAnswer.bind(this);
  }

  answerValue() {
    let value;
    if (this.props.question && this.props.customerSession) {
      const answers =
        this.props.customerSession.answers[this.props.question._id];
      if (!_.isEmpty(answers)) {
        value = answers[0];
      }
    }
    return value;
  }

  updateAnswer(event) {
    const customerSession = this.props.customerSession;
    const question = this.props.question;
    const answer = event.currentTarget.value;
    if (customerSession && question) {
      this.updateAnswerDebounced({
        sessionId: customerSession._id,
        questionId: question._id,
        answer,
      });
    }
  }

  render() {
    return (
      <div className="wizard-free-text-answer">
        <FormControl
          ref="answerInput"
          type="text"
          placeholder={this.props.question.label}
          defaultValue={this.answerValue()}
          onChange={this.updateAnswer}
        />
      </div>
    );
  }
}

WizardFreeTextAnswer.propTypes = {
  question: React.PropTypes.object.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export default WizardFreeTextAnswer;
