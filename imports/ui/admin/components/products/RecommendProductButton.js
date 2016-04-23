import React from 'react';
import { Button } from 'react-bootstrap';

import { addRecommendedProduct }
  from '/imports/api/recommended_products/methods.js';

class RecommendProductButton extends React.Component {
  constructor(props) {
    super(props);
    this.addProductToRecommendedList =
      this.addProductToRecommendedList.bind(this);
  }

  addProductToRecommendedList(event) {
    event.preventDefault();
    const recommendedProduct = {
      productName: this.props.rowData.productName,
      variationName: this.props.rowData.variationName,
      productId: this.props.rowData._id,
    };
    addRecommendedProduct.call(recommendedProduct);
  }

  render() {
    return (
      <Button bsStyle="primary" onClick={this.addProductToRecommendedList}>
        Recommend
      </Button>
    );
  }
}

RecommendProductButton.propTypes = {
  rowData: React.PropTypes.object,
};

export default RecommendProductButton;
