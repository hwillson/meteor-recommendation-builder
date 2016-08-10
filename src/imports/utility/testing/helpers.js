import TestUtils from 'react-addons-test-utils';

const shallowRenderComponent = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

export default shallowRenderComponent;
