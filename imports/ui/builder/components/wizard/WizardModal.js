import React from 'react';
import { Modal } from 'react-bootstrap';

class WizardModal extends React.Component {

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
        <Modal.Header closeButton />
        <Modal.Body>
          TODO
        </Modal.Body>
        <Modal.Footer>
          pagination ...
        </Modal.Footer>
      </Modal>
    );
  }

}

WizardModal.propTypes = {
  showModal: React.PropTypes.bool,
  handleShowHideModal: React.PropTypes.func,
};

export default WizardModal;
