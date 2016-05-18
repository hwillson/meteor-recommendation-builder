import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';
import { _ } from '../../../../utility/meteor/packages';
import s from 'underscore.string';

class SelectedAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.openWizard = this.openWizard.bind(this);
  }

  openWizard() {
    this.unfocus();
    this.props.handleShowHideWizardModal(true, this.props.question);
  }

  unfocus() {
    ReactDOM.findDOMNode(this.refs.answerInput).blur();
  }

  getSelectedAnswerIds() {
    let selectedAnswerIds = [];
    const allAnswers = this.props.customerSession.answers;
    if (allAnswers) {
      selectedAnswerIds = allAnswers[this.props.question._id];
    }
    return selectedAnswerIds;
  }

  renderSelectedAnswerLink() {
    let selectedAnswerLink;
    const selectedAnswerIds = this.getSelectedAnswerIds();
    if (!_.isEmpty(selectedAnswerIds)) {
      const availableAnswers = this.props.question.availableAnswers;
      const answerLabels = [];
      selectedAnswerIds.forEach((answerId) => {
        availableAnswers.forEach((answer) => {
          if (answerId === answer.answerId) {
            answerLabels.push(answer.answer);
            return;
          }
        });
      });
      selectedAnswerLink = (
        <a href="#" ref="answerInput" onClick={this.openWizard}
            className="selected-answer-link">
          {s.toSentence(answerLabels)}
        </a>
      );
    }
    return selectedAnswerLink;
  }

  render() {
    if (!_.isEmpty(this.getSelectedAnswerIds())) {
      return this.renderSelectedAnswerLink();
    } else {
      return (
        <FormControl type="text"
          placeholder={`Select ${this.props.question.label}`}
          className="selected-answer"
          onClick={this.openWizard}
          ref="answerInput"
        />
      );
    }
  }
}

SelectedAnswer.propTypes = {
  question: React.PropTypes.object.isRequired,
  handleShowHideWizardModal: React.PropTypes.func.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export default SelectedAnswer;
