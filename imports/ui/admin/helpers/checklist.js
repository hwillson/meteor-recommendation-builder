const checklist = {

  isChecked(values, value) {
    let isChecked = false;
    if (values && values.indexOf(value) > -1) {
      isChecked = true;
    }
    return isChecked;
  },

  saveChanges({ values, value, checked, productId, method, field }) {
    if (values && value && productId && method && field) {
      const valuePosition = values.indexOf(value);
      if (checked && (valuePosition === -1)) {
        values.push(value);
      } else {
        values.splice(valuePosition, 1);
      }
      method.call({
        productId,
        [field]: values,
      });
    }
  },

  generateElementId(productId, value) {
    let elementId = '';
    if (productId && value) {
      elementId = `${productId}_${value}`;
    }
    return elementId;
  },

};

export default checklist;
