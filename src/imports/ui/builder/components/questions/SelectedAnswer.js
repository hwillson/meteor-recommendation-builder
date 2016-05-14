import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';

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

  render() {
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

SelectedAnswer.propTypes = {
  question: React.PropTypes.object.isRequired,
  handleShowHideWizardModal: React.PropTypes.func.isRequired,
};

export default SelectedAnswer;
