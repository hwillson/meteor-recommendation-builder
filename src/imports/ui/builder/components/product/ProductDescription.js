import React, { Component } from 'react';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.showLessSize = 100;
    this.state = {
      showMore: false,
    };
    this.showMore = this.showMore.bind(this);
    this.showLess = this.showLess.bind(this);
  }

  productDescription() {
    let description = this.props.product.productDescription;
    if (!this.state.showMore && description
        && description.length > this.showLessSize) {
      description = `${description.substring(0, this.showLessSize)}... `;
    }
    return description;
  }

  showMoreLessLink() {
    let moreLessLink;
    const description = this.props.product.productDescription;
    if (description && description.length > this.showLessSize) {
      if (this.state.showMore) {
        moreLessLink = (
          <a href="/less" onClick={this.showLess}>-less</a>
        );
      } else {
        moreLessLink = (
          <a href="/more" onClick={this.showMore}>+more</a>
        );
      }
    }
    return moreLessLink;
  }

  showMore(event) {
    event.preventDefault();
    this.setState({
      showMore: true,
    });
  }

  showLess(event) {
    event.preventDefault();
    this.setState({
      showMore: false,
    });
  }

  render() {
    return (
      <div className="product-description">
        {this.productDescription()}
        {this.showMoreLessLink()}
      </div>
    );
  }
}

ProductDescription.propTypes = {
  product: React.PropTypes.object.isRequired,
};

export default ProductDescription;
