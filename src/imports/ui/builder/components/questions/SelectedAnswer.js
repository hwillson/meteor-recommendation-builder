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

  getSelectedAnswerIds() {
    let selectedAnswerIds = [];
    const allAnswers = this.props.customerSession.answers;
    if (allAnswers) {
      selectedAnswerIds = allAnswers[this.props.question._id];
    }
    return selectedAnswerIds;
  }

  openWizard() {
    this.unfocus();
    this.props.handleShowHideWizardModal(true, this.props.question);
  }

  unfocus() {
    ReactDOM.findDOMNode(this.refs.answerInput).blur();
  }

  placeholder() {
    let placeholder = this.props.question.label;
    if (this.props.question.mandatory) {
      placeholder += ' *';
    }
    return placeholder;
  }

  renderSelectedAnswerLink() {
    let selectedAnswerLink;
    const selectedAnswerIds = this.getSelectedAnswerIds();
    if (!_.isEmpty(selectedAnswerIds)) {
      const availableAnswers = this.props.question.availableAnswers;
      let answerSentence;
      if (availableAnswers) {
        const answerLabels = [];
        selectedAnswerIds.forEach((answerId) => {
          availableAnswers.forEach((answer) => {
            if (answerId === answer.answerId) {
              answerLabels.push(answer.answer);
              return;
            }
          });
        });
        answerSentence = s.toSentence(answerLabels);
      } else {
        answerSentence = selectedAnswerIds;
      }
      if (answerSentence) {
        selectedAnswerLink = (
          <a
            href="#" ref="answerInput" onClick={this.openWizard}
            className="selected-answer-link"
          >
            {answerSentence}
          </a>
        );
      }
    }
    return selectedAnswerLink;
  }

  render() {
    let content;
    if (!_.isEmpty(this.getSelectedAnswerIds())) {
      content = this.renderSelectedAnswerLink();
    } else {
      content = (
        <FormControl
          type="text"
          placeholder={this.placeholder()}
          className="selected-answer"
          onClick={this.openWizard}
          ref="answerInput"
        />
      );
    }
    return content;
  }
}

SelectedAnswer.propTypes = {
  question: React.PropTypes.object.isRequired,
  handleShowHideWizardModal: React.PropTypes.func.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

export default SelectedAnswer;
