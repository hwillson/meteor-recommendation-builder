import React from 'react';

function renderChat(expert) {
  let content;
  if (expert.chatLink) {
    content = (
      <div className="expert-chat">
        <i className="fa fa-comments fa-2x" />
        <a href="{expert.chatLink}">Chat with {expert.firstName}</a>
      </div>
    );
  }
  return content;
}

const Expert = ({ expert }) => {
  let content = null;
  if (expert) {
    content = (
      <div className="expert">
        <p>
          <strong>{expert.firstName} {expert.lastName}</strong>
          , {expert.title}
        </p>
        <img src={expert.imageUrl} alt="Expert" />
        {renderChat(expert)}
        <p>
          <a href={`mailto:${expert.email}`}>
            <i className="fa fa-envelope" />
          </a>
          <a href={`mailto:${expert.twitter}`}>
            <i className="fa fa-twitter" />
          </a>
          <a href={`mailto:${expert.facebook}`}>
            <i className="fa fa-facebook" />
          </a>
          <span className="expert-phone">{expert.phone}</span>
        </p>
        <p className="expert-siderbar-msg">{expert.sidebarMessage}</p>
      </div>
    );
  }
  return content;
};

Expert.propTypes = {
  expert: React.PropTypes.object,
};

export default Expert;
