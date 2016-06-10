import React from 'react';
import { Row, Col } from 'react-bootstrap';

function renderChat(expert) {
  let content;
  if (expert.chatLink) {
    content = (
      <div className="expert-chat">
        <i className="fa fa-comments fa-2x"></i>
        <a href="{expert.chatLink}">Chat with {expert.firstName}</a>
      </div>
    );
  }
  return content;
}

const ExpertWelcome = ({ expert, customerName }) => {
  let content;
  if (!expert) {
    content = <Col md={12}>Loading ...</Col>;
  } else {
    content = (
      <div>
        <Col mdOffset={1} md={3} className="expert-left">
          <img src={expert.imageUrl} alt="Expert" />
          <p>
            <strong>{expert.firstName} {expert.lastName}</strong>
            , {expert.title}
          </p>
          <p>
            <a href={`mailto:${expert.email}`}>
              <i className="fa fa-envelope"></i>
            </a>
            <a href={`mailto:${expert.twitter}`}>
              <i className="fa fa-twitter"></i>
            </a>
            <a href={`mailto:${expert.facebook}`}>
              <i className="fa fa-facebook"></i>
            </a>
            <span className="expert-phone">{expert.phone}</span>
          </p>
        </Col>
        <Col md={7} className="expert-right">
          <p className="expert-welcome-msg">
            Hi {customerName}, I'm {expert.firstName}!
          </p>
          <p className="expert-welcome-msg">{expert.welcomeMessage}</p>
          <p className="expert-overview-msg">{expert.overviewMessage}</p>
          {renderChat(expert)}
        </Col>
      </div>
    );
  }
  return (
    <Row className="expert-welcome">
      {content}
    </Row>
  );
};

ExpertWelcome.propTypes = {
  expert: React.PropTypes.object,
  customerName: React.PropTypes.string,
};

export default ExpertWelcome;
