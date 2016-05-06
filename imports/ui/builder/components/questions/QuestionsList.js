import React from 'react';
import { Row } from 'react-bootstrap';

import SelectedAnswer from './SelectedAnswer.js';

const QuestionsList = ({ loading, questionsExist, questions }) => {
  let content = <span className="loading">Loading questions...</span>;
  if (!loading) {
    if (questionsExist) {
      const questionItems = [];
      questions.forEach((question) => {
        questionItems.push(
          <li key={question._id} className="question">
            {question.content}
            <SelectedAnswer label={question.label}
              className="selected-answer"
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
    <Row className="questions">
      {content}
    </Row>
  );
};

QuestionsList.propTypes = {
  loading: React.PropTypes.bool,
  questionsExist: React.PropTypes.bool,
  questions: React.PropTypes.array,
};

export default QuestionsList;
