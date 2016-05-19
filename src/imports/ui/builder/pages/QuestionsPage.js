import React from 'react';
import { Row } from 'react-bootstrap';

import SelectedAnswer from '../components/questions/SelectedAnswer';
import GenerateRecommendationsButton
  from '../components/questions/GenerateRecommendationsButton';
import WizardModal from '../components/wizard/WizardModal';

class QuestionsPage extends React.Component {

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
    if (!this.props.loading) {
      if (this.props.questionsExist) {
        const questionItems = [];
        this.props.questions.forEach((question) => {
          questionItems.push(
            <li key={question._id} className="question">
              {question.summary}
              <SelectedAnswer
                question={question}
                className="selected-answer"
                handleShowHideWizardModal={this.showHideWizardModal}
                customerSession={this.props.customerSession}
              />
            </li>
          );
        });
        content = (<ol>{questionItems}</ol>);
      } else {
        content = (
          <span className="no-questions">
            No questions.
          </span>
        );
      }
    }
    return (
      <div className="questions">
        <Row>
          {content}
        </Row>
        <GenerateRecommendationsButton
          questions={this.props.questions}
          customerSession={this.props.customerSession}
        />
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
  loading: React.PropTypes.bool,
  questionsExist: React.PropTypes.bool,
  questions: React.PropTypes.array,
  customerSession: React.PropTypes.object.isRequired,
};

export default QuestionsPage;
