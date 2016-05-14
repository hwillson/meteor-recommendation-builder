import React from 'react';
import { Row } from 'react-bootstrap';

import SelectedAnswer from './SelectedAnswer.js';
import WizardModal from '../wizard/WizardModal.js';

class QuestionsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showWizardModal: false,
      selectedQuestion: null,
    };
    this.showHideWizardModal = this.showHideWizardModal.bind(this);
  }

  showHideWizardModal(newState, selectedQuestion) {
    this.setState({
      showModal: newState,
      selectedQuestion
    });
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
              <SelectedAnswer question={question}
                className="selected-answer"
                handleShowHideWizardModal={this.showHideWizardModal}
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
        <WizardModal showModal={this.state.showModal}
          handleShowHideModal={this.showHideWizardModal}
          questions={this.props.questions}
          selectedQuestion={this.state.selectedQuestion}
        />
      </div>
    );
  }

}

QuestionsList.propTypes = {
  loading: React.PropTypes.bool,
  questionsExist: React.PropTypes.bool,
  questions: React.PropTypes.array,
};

export default QuestionsList;
