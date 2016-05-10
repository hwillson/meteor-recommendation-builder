import React from 'react';

import { updateHours } from '/imports/api/recommended_products/methods.js';
import hourLookup from '/imports/utility/lookups/hour_lookup.js';
import checklist from '../../helpers/checklist.js';
import ListCheckbox from './ListCheckbox.jsx';

class HourList extends React.Component {

  saveHours(event) {
    checklist.saveChanges({
      values: this.props.hours,
      value: event.target.value,
      checked: event.target.checked,
      productId: this.props.productId,
      method: updateHours,
      field: 'hours',
    });
  }

  renderHours() {
    const content = [];
    const hours = hourLookup.codes;
    Object.keys(hours).forEach((hourKey) => {
      const hour = hours[hourKey];
      const checked = checklist.isChecked(this.props.hours, hour.id);
      content.push(
        <ListCheckbox
          key={`${this.props.productId}_${hour.id}`}
          productId={this.props.productId}
          value={hour.id}
          label={hour.label}
          checked={checked}
          onChange={this.saveHours}
        />
      );
    });
    return content;
  }

  render() {
    return (
      <div className="hours-list">
        {this.renderHours()}
      </div>
    );
  }

}

HourList.propTypes = {
  productId: React.PropTypes.string,
  hours: React.PropTypes.array,
};

export default HourList;
