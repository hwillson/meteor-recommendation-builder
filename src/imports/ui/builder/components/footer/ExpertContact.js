import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ExpertContact = ({ expert }) => {
  let content;
  if (!expert) {
    content = (
      <Row>
        <Col md={12} className="text-center">
          <div className="expert-loading">
            Loading ...
          </div>
        </Col>
      </Row>
    );
  } else {
    content = (
      <div>
        <Row className="expert-contact-msg">
          <Col mdOffset={2} md={8}>
            <p>
              Want to chat with our
              expert <strong>{expert.firstName}?</strong> Click below to chat
              online (9am - 5pm), sign up for a custom
              consultation, or subscribe to our email list with content focused
              on finding you your next awesome car!
            </p>
          </Col>
        </Row>
        <Row className="expert-contact-options">
          <Col mdOffset={3} md={2}>
            <a href={expert.chatLink}>
              <img src="/images/expert/expert_chat.png" alt="Expert chat" />
            </a>
            <p><a href={expert.chatLink}>Chat online</a></p>
          </Col>
          <Col md={2}>
            <a href="#">
              <img
                src="/images/expert/expert_placeholder.png"
                alt="Expert consultation"
                className="expert-avatar"
              />
            </a>
            <p><a href="#">Arrange a custom consultation</a></p>
          </Col>
          <Col md={2}>
            <a href="#">
              <img src="/images/expert/expert_email.png" alt="Expert email" />
            </a>
            <p><a href="#">Receive nutrition tips by email</a></p>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="expert-contact">
      {content}
    </div>
  );
};

ExpertContact.propTypes = {
  expert: React.PropTypes.object,
};

export default ExpertContact;
