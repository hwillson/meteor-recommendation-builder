import React from 'react';
import { Modal, Pagination } from 'react-bootstrap';

import { WizardQuestion } from './WizardQuestion';

class WizardModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.close = this.close.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.questions
        && (newProps.questions.length > 0)
        && newProps.selectedQuestion) {
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

  renderQuestion() {
    const question = this.props.selectedQuestion;
    if (question) {
      return (
        <WizardQuestion key={question._id} question={question}
          customerSession={this.props.customerSession}
        />
      );
    }
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.close} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {this.renderQuestion()}
          <Pagination
            ref="wizard-pagination" items={this.props.questions.length}
            activePage={this.state.activePage}
            onSelect={this.changePage}
          />
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
