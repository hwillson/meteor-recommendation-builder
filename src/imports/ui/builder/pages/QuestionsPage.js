import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { _ } from '../../../utility/meteor/packages';

import SelectedAnswer from '../components/questions/SelectedAnswer';
import GenerateRecommendationsButton
  from '../components/questions/GenerateRecommendationsButton';
import WizardModal from '../components/wizard/WizardModal';

class QuestionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWizardModal: false,
      selectedQuestion: null,
    };
    this.showHideWizardModal = this.showHideWizardModal.bind(this);
    this.handleQuestionSelection = this.handleQuestionSelection.bind(this);
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

  render() {
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
    return (
      <div className="questions-page">
        <Row className="questions">
          <Col mdOffset={2} md={8} className="text-center clearfix">
            {content}
            <div className="required-fields">
              * required fields
            </div>
            <GenerateRecommendationsButton
              questions={this.props.questions}
              customerSession={this.props.customerSession}
            />
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
