import React from 'react';

import { updateGender } from '/imports/api/recommended_products/methods.js';
import ListCheckbox from './ListCheckbox.jsx';
import checklist from '../../helpers/checklist.js';

class GenderList extends React.Component {

  saveGender(event) {
    checklist.saveChanges({
      values: this.props.gender,
      value: event.target.value,
      checked: event.target.checked,
      productId: this.props.productId,
      method: updateGender,
      field: 'gender',
    });
  }

  render() {
    return (
      <div className="gender-list">
        <ListCheckbox
          productId={this.props.productId}
          value="M"
          label="Male"
          checked={checklist.isChecked(this.props.gender, 'M')}
          onChange={this.saveGender}
        />
        <ListCheckbox
          productId={this.props.productId}
          value="F"
          label="Female"
          checked={checklist.isChecked(this.props.gender, 'F')}
          onChange={this.saveGender}
        />
      </div>
    );
  }

}

GenderList.propTypes = {
  productId: React.PropTypes.string,
  gender: React.PropTypes.array,
};

export default GenderList;
