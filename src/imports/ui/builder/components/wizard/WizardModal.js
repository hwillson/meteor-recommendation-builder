import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Modal, Pagination } from 'react-bootstrap';

import { WizardQuestion } from './WizardQuestion';
import WizardFreeTextQuestion from './WizardFreeTextQuestion';
import NextQuestionButton from './NextQuestionButton';
import DoneButton from './DoneButton';

class WizardModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.close = this.close.bind(this);
    this.changePage = this.changePage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.questions
        && (newProps.questions.length > 0)
        && newProps.selectedQuestion) {
      let activePage;
      let pageCount = 1;
      newProps.questions.forEach((question) => {
        if (question._id === newProps.selectedQuestion._id) {
          activePage = pageCount;
          return;
        }
        pageCount++;
      });
      this.setState({
        activePage,
      });
    }
  }

  close() {
    this.props.handleShowHideModal(false);
  }

  changePage(eventKey) {
    if (eventKey && (eventKey > 0)) {
      this.setState({
        activePage: eventKey,
      });
      this.props.onQuestionSelection(this.props.questions[eventKey - 1]);
    }
  }

  nextPage() {
    const nextPageNumber = this.state.activePage + 1;
    this.setState({
      activePage: nextPageNumber,
    });
    this.props.onQuestionSelection(this.props.questions[nextPageNumber - 1]);
  }

  renderQuestion() {
    const question = this.props.selectedQuestion;
    let content;
    if (question) {
      if (question.availableAnswers) {
        content = (
          <WizardQuestion
            key={question._id}
            question={question}
            customerSession={this.props.customerSession}
          />
        );
      } else {
        content = (
          <WizardFreeTextQuestion
            key={question._id}
            question={question}
            customerSession={this.props.customerSession}
          />
        );
      }
    }
    return content;
  }

  render() {
    let continueButton;
    if (this.state.activePage < this.props.questions.length) {
      continueButton = (
        <NextQuestionButton moveToNextQuestion={this.nextPage} />
      );
    } else {
      continueButton = <DoneButton closeModal={this.close} />;
    }
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.close}
        animation={false}
        className="wizard-modal"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <ReactCSSTransitionReplace
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {this.renderQuestion()}
          </ReactCSSTransitionReplace>
          {continueButton}
          <div className="clearfix">
            <Pagination
              ref="wizard-pagination" items={this.props.questions.length}
              activePage={this.state.activePage}
              onSelect={this.changePage}
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

}

WizardModal.propTypes = {
  showModal: React.PropTypes.bool,
  handleShowHideModal: React.PropTypes.func,
  questions: React.PropTypes.array.isRequired,
  selectedQuestion: React.PropTypes.object,
  customerSession: React.PropTypes.object.isRequired,
  onQuestionSelection: React.PropTypes.func.isRequired,
};

export default WizardModal;
