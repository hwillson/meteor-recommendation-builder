import React from 'react';
import { Button } from 'react-bootstrap';

import { removeRecommendedProduct }
  from '/imports/api/recommended_products/methods.js';

class RemoveRecommendedProductButton extends React.Component {
  constructor(props) {
    super(props);
    this.removeRecommendedProduct = this.removeRecommendedProduct.bind(this);
  }

  removeRecommendedProduct(event) {
    if (event) {
      event.preventDefault();
    }
    removeRecommendedProduct.call({
      _id: this.props._id,
      variationId: this.props.variationId,
    });
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.removeRecommendedProduct}>
        Remove
      </Button>
    );
  }
}

RemoveRecommendedProductButton.propTypes = {
  _id: React.PropTypes.string,
  variationId: React.PropTypes.number,
};

export default RemoveRecommendedProductButton;
