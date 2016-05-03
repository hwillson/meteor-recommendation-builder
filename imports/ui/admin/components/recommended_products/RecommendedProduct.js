import React from 'react';
import { Meteor } from 'meteor/meteor';
import Multiselect from 'react-bootstrap-multiselect';

import RemoveRecommendedProductButton
  from './RemoveRecommendedProductButton.js';

const imageHost = Meteor.settings.public.admin.products.imageHost;

const renderAvailableAnswers = (question) => {
  const availableAnswers = question.availableAnswers;
  return (
    <div key={question.questionId} className="available-answers">
      {question.label}:
      <Multiselect data={availableAnswers} multiple="multiple" />
    </div>
  );
};

const RecommendedProduct = ({ product, questions }) => (
  <tr className="recommended-product">
    <td>
      <img src={`${imageHost}${product.productImage}`} alt="Product"
        className="product-image"
      />
    </td>
    <td>{product.productName}</td>
    <td>{product.variationName}</td>
    <td>
      {questions.map(question => (renderAvailableAnswers(question)))}
    </td>
    <td>
      <RemoveRecommendedProductButton _id={product._id}
        variationId={product.variationId}
      />
    </td>
  </tr>
);

RecommendedProduct.propTypes = {
  product: React.PropTypes.object.isRequired,
  questions: React.PropTypes.array.isRequired,
};

export default RecommendedProduct;
