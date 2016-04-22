import React from 'react';

import { updateSports } from '/imports/api/recommended_products/methods.js';
import checklist from '../../helpers/checklist.js';
import sportLookup from '/imports/utility/lookups/sport_lookup.js';
import ListCheckbox from './ListCheckbox.jsx';

class SportList extends React.Component {

  saveSports(event) {
    checklist.saveChanges({
      values: this.props.sports,
      value: event.target.value,
      checked: event.target.checked,
      productId: this.props.productId,
      method: updateSports,
      field: 'sports',
    });
  }

  renderSports() {
    const sportContent = [];
    const sports = sportLookup.codes;
    Object.keys(sports).forEach((sportKey) => {
      const sport = sports[sportKey];
      const checked = checklist.isChecked(this.props.sports, sport.id);
      sportContent.push(
        <ListCheckbox
          key={`${this.props.productId}_${sport.id}`}
          productId={this.props.productId}
          value={sport.id}
          label={sport.label}
          checked={checked}
          onChange={this.saveSports}
        />
      );
    });
    return sportContent;
  }

  render() {
    return (
      <div className="sports-list">
        {this.renderSports()}
      </div>
    );
  }

}

SportList.propTypes = {
  productId: React.PropTypes.string,
  sports: React.PropTypes.array,
};

export default SportList;
