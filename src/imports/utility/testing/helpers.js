import TestUtils from 'react-addons-test-utils';

export const shallowRenderComponent = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};
