import React from 'react';
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';

class SelectedAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.openWizard = this.openWizard.bind(this);
  }

  openWizard() {
    ReactDOM.findDOMNode(this.refs.answerInput).blur();
    console.log('todo!');
  }

  render() {
    return (
      <FormControl type="text" placeholder={`Select ${this.props.label}`}
        className="selected-answer"
        onClick={this.openWizard}
        ref="answerInput"
      />
    );
  }
}

SelectedAnswer.propTypes = {
  label: React.PropTypes.string,
};

export default SelectedAnswer;
