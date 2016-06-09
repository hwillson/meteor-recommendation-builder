import React from 'react';
import { Button } from 'react-bootstrap';

const DoneButton = ({ closeModal }) => (
  <Button bsStyle="primary" onClick={() => { closeModal(); }}>Done!</Button>
);

DoneButton.propTypes = {
  closeModal: React.PropTypes.func.isRequired,
};

export default DoneButton;
