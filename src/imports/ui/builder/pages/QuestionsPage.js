import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { _ } from '../../../utility/meteor/packages';

import SelectedAnswer from '../components/questions/SelectedAnswer';
import GenerateRecommendationsButton
  from '../components/questions/GenerateRecommendationsButton';
import WizardModal from '../components/wizard/WizardModal';
import CustomerNameCapture from '../components/questions/CustomerNameCapture';
import { assignRandomExpert } from '../../../api/experts/methods';

class QuestionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWizardModal: false,
      selectedQuestion: null,
    };
    this.showHideWizardModal = this.showHideWizardModal.bind(this);
    this.handleQuestionSelection = this.handleQuestionSelection.bind(this);
    this.areMandatoryQuestionsAnswered =
      this.areMandatoryQuestionsAnswered.bind(this);
  }

  componentWillMount() {
    this.setDefaultSelectedQuestion(this.props.questions);
  }

  componentWillReceiveProps(newProps) {
    this.setDefaultSelectedQuestion(newProps.questions);
  }

  setDefaultSelectedQuestion(questions) {
    if (!this.state.selectedQuestion) {
      if (questions && (questions.length > 0)) {
        this.handleQuestionSelection(questions[0]);
      }
    }
  }

  handleQuestionSelection(selectedQuestion) {
    this.setState({
      selectedQuestion,
    });
  }

  showHideWizardModal(newState, selectedQuestion) {
    this.setState({
      showModal: newState,
    });
    this.handleQuestionSelection(selectedQuestion);
  }

  areMandatoryQuestionsAnswered() {
    const questions = this.props.questions;
    const customerSession = this.props.customerSession;
    let mandatoryQuestionsAnswered = false;
    if (customerSession && !_.isEmpty(customerSession.answers)) {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (question.mandatory) {
          const questionAnswers = customerSession.answers[question._id];
          if (_.isEmpty(questionAnswers)) {
            mandatoryQuestionsAnswered = false;
            break;
          }
          mandatoryQuestionsAnswered = true;
        }
      }
    }
    return mandatoryQuestionsAnswered;
  }

  renderCustomerNameCapture() {
    let content;
    if (!this.areMandatoryQuestionsAnswered()) {
      content = (
        <div className="required-fields">
          * required fields
        </div>
      );
    } else {
      content = (
        <CustomerNameCapture
          customerSession={this.props.customerSession}
        />
      );
    }
    return content;
  }

  renderGenerateButton() {
    let disabled = true;
    if (this.props.customerSession
        && this.props.customerSession.customerName
        && this.areMandatoryQuestionsAnswered()) {
      disabled = false;
    }
    return (
      <GenerateRecommendationsButton disabled={disabled} />
    );
  }

  renderQuestions() {
    let content = <span className="loading">Loading questions...</span>;
    if (!_.isEmpty(this.props.questions)) {
      const questionItems = [];
      this.props.questions.forEach((question) => {
        questionItems.push(
          <div key={question._id} className="question">
            {question.summary}
            <SelectedAnswer
              question={question}
              className="selected-answer"
              handleShowHideWizardModal={this.showHideWizardModal}
              customerSession={this.props.customerSession}
            />
            .
          </div>
        );
      });
      content = (<div className="question-items">{questionItems}</div>);
    } else {
      content = (
        <span className="loading">
          Loading ...
        </span>
      );
    }
    return content;
  }

  renderExpert() {
    // TODO - this is temp for now; will show expert here and decide
    // where to best assign the new expert ...
    if (this.areMandatoryQuestionsAnswered()) {
      const customerSession = this.props.customerSession;
      if (customerSession && !customerSession.expertId) {
        assignRandomExpert.call({ sessionId: customerSession._id });
      }
    }
  }

  render() {
    return (
      <div className="questions-page">
        <Row className="questions">
          {this.renderExpert()}
          <Col mdOffset={2} md={8} className="text-center clearfix">
            {this.renderQuestions()}
            <Row>
              <Col mdOffset={3} md={6}>
                {this.renderCustomerNameCapture()}
                {this.renderGenerateButton()}
              </Col>
            </Row>
          </Col>
        </Row>
        <WizardModal
          showModal={this.state.showModal}
          handleShowHideModal={this.showHideWizardModal}
          questions={this.props.questions}
          selectedQuestion={this.state.selectedQuestion}
          customerSession={this.props.customerSession}
          onQuestionSelection={this.handleQuestionSelection}
        />
      </div>
    );
  }

}

QuestionsPage.propTypes = {
  questions: React.PropTypes.array.isRequired,
  customerSession: React.PropTypes.object.isRequired,
};

QuestionsPage.defaultProps = {
  questions: [],
  customerSession: {},
};

export default QuestionsPage;
