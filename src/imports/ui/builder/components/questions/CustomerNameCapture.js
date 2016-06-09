import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { _ } from '../../../../utility/meteor/packages';

import {
  updateCustomerName,
} from '../../../../api/customer_sessions/methods';

class CustomerNameCapture extends Component {
  constructor(props) {
    super(props);

    this.updateNameDebounced = _.debounce(
      ({ sessionId, customerName }) => {
        updateCustomerName.call({ sessionId, customerName });
      },
      500
    );

    this.updateName = this.updateName.bind(this);
  }

  updateName(event) {
    const customerSession = this.props.customerSession;
    const customerName = event.currentTarget.value;
    if (customerSession) {
      this.updateNameDebounced({
        sessionId: customerSession._id,
        customerName,
      });
    }
  }

  render() {
    return (
      <div className="customer-name-capture">
        <p>Great, we're almost ready to go!</p>
        <p>What's your name?</p>
        <FormControl
          type="text"
          placeholder="Type name here ..."
          defaultValue={this.props.customerSession.customerName}
          onChange={this.updateName}
        />
      </div>
    );
  }
}

CustomerNameCapture.propTypes = {
  customerSession: React.PropTypes.object.isRequired,
};

export default CustomerNameCapture;
