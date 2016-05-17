import TestUtils from 'react-addons-test-utils';

export const renderComponent = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};
