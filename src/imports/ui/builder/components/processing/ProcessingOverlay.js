import React from 'react';

const ProcessingOverlay = ({ show }) => {
  let overlay = null;
  if (show) {
    overlay = (
      <div className="processing-overlay">
        <i className="fa fa-cog fa-2x fa-spin" />
        <p>Prepping your checkout ...</p>
      </div>
    );
  }
  return overlay;
};

ProcessingOverlay.propTypes = {
  show: React.PropTypes.bool,
};

ProcessingOverlay.defaultProps = {
  show: false,
};

export default ProcessingOverlay;
