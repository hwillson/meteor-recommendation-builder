export const maybePluralizeItemsLabel = (totalItems) => {
  let label = ' item';
  if (totalItems > 1) {
    label += 's';
  }
  return label;
};
