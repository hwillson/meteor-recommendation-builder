import React from 'react';

class WizardAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  handleAnswerSelected() {
    this.props.onAnswerSelected(
      this.props.answer.answerId,
      !this.props.selected
    );
  }

  render() {
    let selectedAnswerClass = '';
    if (this.props.selected) {
      selectedAnswerClass = 'wizard-selected-answer';
    }

    let image;
    let noImageClass = '';
    if (this.props.answer.imagePath) {
      image = (
        <div className="wizard-answer-image">
          <img
            src={this.props.answer.imagePath} alt="Answer"
            className="img-responsive"
          />
        </div>
      );
    } else {
      noImageClass = 'no-image';
    }

    return (
      <div
        className={`wizard-answer ${selectedAnswerClass} ${noImageClass}`}
        onClick={this.handleAnswerSelected}
      >
        {image}
        <div className="wizard-answer-content">
          {this.props.answer.answer}
        </div>
      </div>
    );
  }
}

WizardAnswer.propTypes = {
  answer: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool,
  onAnswerSelected: React.PropTypes.func.isRequired,
};

WizardAnswer.defaultProps = {
  selected: false,
};

export default WizardAnswer;
