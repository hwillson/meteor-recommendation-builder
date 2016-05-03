import React from 'react';

const BuilderLayout = (props) => (
  <div className="builder">
    {props.children}
  </div>
);

BuilderLayout.propTypes = {
  children: React.PropTypes.element,
};

export default BuilderLayout;
