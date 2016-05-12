/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithClass, findWithType } from 'react-shallow-testutils';
import { LinkContainer } from 'react-router-bootstrap';

import WelcomePage from '../../../../../src/imports/ui/builder/pages/WelcomePage.js';

describe('ui.builder.pages.WelcomePage', function () {
  it('should show welcome content', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<WelcomePage />);
    const output = renderer.getRenderOutput();
    const welcomeContent = findWithClass(output, 'welcome-page');
    expect(welcomeContent).to.not.be.empty;
  });

  it(
    'should have get started button pointing to questions page',
    function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<WelcomePage />);
      const output = renderer.getRenderOutput();
      const linkContainer = findWithType(output, LinkContainer);
      expect(linkContainer).to.not.be.empty;
      expect(linkContainer.props.to.pathname).to.equal(
        '/builder/questions'
      );
    }
  );
});
