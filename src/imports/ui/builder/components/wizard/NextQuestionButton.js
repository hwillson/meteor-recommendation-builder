import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

class NextQuestionButton extends Component {
  render() {
    return (
      <Button
        ref={(button) => { this.nextQuestionButton = button; }}
        bsStyle="link"
        className="next-question-button"
        onClick={() => {
          ReactDOM.findDOMNode(this.nextQuestionButton).blur();
          this.props.moveToNextQuestion();
        }}
      >
        Next Question <i className="fa fa-arrow-right" />
      </Button>
    );
  }
}

NextQuestionButton.propTypes = {
  moveToNextQuestion: React.PropTypes.func.isRequired,
};

export default NextQuestionButton;
