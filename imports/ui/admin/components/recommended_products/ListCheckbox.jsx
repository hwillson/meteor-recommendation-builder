import React from 'react';

import checklist from '../../helpers/checklist.js';

function ListCheckbox({ productId, value, label, checked, onChange }) {
  const checkboxId = checklist.generateElementId(productId, value);
  return (
    <div className="list-checkbox formGroup">
      <input type="checkbox" id={checkboxId} value={value}
        onChange={onChange} checked={checked}
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
}

ListCheckbox.propTypes = {
  productId: React.PropTypes.string,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

export default ListCheckbox;
