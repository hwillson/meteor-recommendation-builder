import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import ProductList from './ProductList.js';

class AddProductModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal,
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close} animation={false}>
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
};

export default AddProductModal;
