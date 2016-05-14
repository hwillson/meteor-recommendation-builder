import React from 'react';
import { Modal, Pagination } from 'react-bootstrap';

import WizardQuestion from './WizardQuestion';

class WizardModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      currentWizardQuestion: null,
    };
    this.close = this.close.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.setCurrentQuestion();
  }

  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setCurrentQuestion(newProps);
    }
  }

  close() {
    this.props.handleShowHideModal(false);
  }

  setCurrentQuestion(newProps) {
    let props = (newProps) ? newProps : this.props;
    let currentWizardQuestion;
    let activePage = 1;
    if (props.questions && (props.questions.length > 0)) {
      if (props.selectedQuestion) {
        let pageCount = 1;
        props.questions.forEach((question) => {
          if (question._id === props.selectedQuestion._id) {
            activePage = pageCount;
            return;
          }
          pageCount++;
        });
        currentWizardQuestion = props.selectedQuestion;
      } else {
        currentWizardQuestion = props.questions[0];
        activePage = 1;
      }
    }
    this.setState({
      currentWizardQuestion,
      activePage,
    });
  }

  changePage(eventKey) {
    if (eventKey && (eventKey > 0)) {
      this.setState({
        activePage: eventKey,
        currentWizardQuestion: this.props.questions[eventKey - 1],
      });
    }
  }

  renderQuestion() {
    const question = this.state.currentWizardQuestion;
    if (question) {
      return (
        <WizardQuestion key={question._id} question={question} />
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
};

export default WizardModal;
