import React from 'react';
import { Button } from 'react-bootstrap';

const RemoveButton = ({ product }) => (
  <Button
    bsStyle="link"
    onClick={() => product.disable()}
    className="remove-button"
  >
    <i className="fa fa-close" />
  </Button>
);

RemoveButton.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default RemoveButton;
