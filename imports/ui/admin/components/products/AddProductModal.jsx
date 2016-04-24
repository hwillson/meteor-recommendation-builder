import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import ProductList from './ProductList.js';

class AddProductModal extends React.Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.handleShowHideModal(false);
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.close} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductList />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

AddProductModal.propTypes = {
  showModal: React.PropTypes.bool,
  handleShowHideModal: React.PropTypes.func,
};

export default AddProductModal;
