import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

class NextQuestionButton extends Component {
  render() {
    return (
      <Button
        ref="nextQuestionButton"
        bsStyle="link"
        className="next-question-button"
        onClick={() => {
          ReactDOM.findDOMNode(this.refs.nextQuestionButton).blur();
          this.props.moveToNextQuestion();
        }}
      >
        Next Question <i className="fa fa-arrow-right"></i>
      </Button>
    );
  }
}

NextQuestionButton.propTypes = {
  moveToNextQuestion: React.PropTypes.func.isRequired,
};

export default NextQuestionButton;
